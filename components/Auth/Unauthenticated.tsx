"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";

const Unauthenticated = () => {
  const { toggleModal } = useContext(ModalContext);
  return (
    <div className={styles.unauthenticated}>
      <div className={styles.inner}>
        <h1>Welcome to Kanban Management 🎉</h1>
        <p>
          The ultimate project management tool. Start up a board in seconds,
          automate tedious tasks, and collaborate anywhere.
        </p>
        <button
          className={`${formStyles.btn} ${formStyles.primary}`}
          style={{ maxWidth: "300px" }}
          onClick={() => toggleModal("Login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Unauthenticated;
