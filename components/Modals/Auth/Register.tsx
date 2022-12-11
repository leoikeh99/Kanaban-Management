"use client";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import Image from "next/image";
import SettingsContext from "@/context/SettingsContext";

const Register = () => {
  const { toggleModal } = useContext(ModalContext);
  const { theme } = useContext(SettingsContext);

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
          <form className={formStyles.form}>
            <div className={formStyles.formGroup}>
              <label htmlFor="username">Email</label>
              <input type="email" placeholder="abc@example.com" />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="" />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" placeholder="" />
            </div>
            <small>
              Already have an account?{" "}
              <button onClick={() => toggleModal("Login")}>Login</button>
            </small>
            <button
              type="submit"
              className={`${formStyles.btn} ${formStyles.primary}`}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
