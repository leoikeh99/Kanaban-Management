"use client";
import React, { useContext, useState } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import Image from "next/image";
import SettingsContext from "@/context/SettingsContext";
import Loader from "@/public/assets/loader.svg";
import { validateRegister } from "../../../app/utils";
import { Alert } from "antd";
import { signIn } from "next-auth/react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const { toggleModal } = useContext(ModalContext);
  const { theme } = useContext(SettingsContext);
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState<ValidateAuthErrors>([]);
  const { getBoardList } = useContext(UserContext);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(errors.filter((err) => err.name !== e.target.name));
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validate = validateRegister(data);
    setErrors(validate);
    if (validate.length !== 0) return;

    setLoading(true);

    await fetch("/api/users/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }

        await res.json().then(async (response) => {
          const _res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          setLoading(false);
          if (!_res?.error) {
            getBoardList();
            toggleModal(null);
            router.refresh();
          } else {
            setError(_res.error);
            setTimeout(() => setError(false), 3000);
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        const error = JSON.parse(err.message);
        setError(error.message);
        setTimeout(() => setError(false), 3000);
      });
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <Image
            priority
            className={styles.logo}
            src={`/assets/logo-${theme === "dark" ? "light" : "dark"}.svg`}
            width={152.53}
            height={25.22}
            alt="logo-dark"
          />
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((err) => err.name === "username")?.message}
              </span>
              <label htmlFor="username">Username</label>
              <input
                className={
                  errors.find((err) => err.name === "username") &&
                  formStyles.error
                }
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((err) => err.name === "email")?.message}
              </span>
              <label htmlFor="email">Email</label>
              <input
                className={
                  errors.find((err) => err.name === "email") && formStyles.error
                }
                type="email"
                placeholder="abc@example.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((err) => err.name === "password")?.message}
              </span>
              <label htmlFor="password">Password</label>
              <input
                className={
                  errors.find((err) => err.name === "password") &&
                  formStyles.error
                }
                type="password"
                placeholder=""
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((err) => err.name === "password2")?.message}
              </span>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={
                  errors.find((err) => err.name === "password2") &&
                  formStyles.error
                }
                type="password"
                placeholder=""
                name="password2"
                onChange={handleChange}
              />
            </div>
            <small>
              Already have an account?{" "}
              <button onClick={() => toggleModal("Login")}>Login</button>
            </small>
            <button
              type="submit"
              disabled={loading}
              className={`${formStyles.btn} ${formStyles.primary}`}>
              {loading && <Loader />} Sign Up
            </button>
            {error && (
              <>
                <br />
                <Alert message={error} type="error" showIcon />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
