"use client";
import React, { useContext, useState } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import Image from "next/image";
import SettingsContext from "@/context/SettingsContext";
import Loader from "@/public/assets/loader.svg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert } from "antd";
import UserContext from "@/context/UserContext";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const { toggleModal } = useContext(ModalContext);
  const { theme } = useContext(SettingsContext);
  const { getBoardList } = useContext(UserContext);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    setLoading(false);
    if (!res?.error) {
      getBoardList();
      toggleModal(null);
      router.refresh();
    } else {
      setError(res.error);
      setTimeout(() => setError(false), 3000);
    }
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="abc@example.com"
                onChange={handleChange}
                value={data.email}
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder=""
                onChange={handleChange}
                value={data.password}
              />
            </div>
            <small>
              Dont have an account?{" "}
              <button onClick={() => toggleModal("Register")}>Sign Up</button>
            </small>
            <button
              type="submit"
              disabled={loading}
              className={`${formStyles.btn} ${formStyles.primary}`}>
              {loading && <Loader />} Login
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

export default Login;
