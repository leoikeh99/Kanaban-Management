import React, { useContext } from "react";
import styles from "./styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";

const AuthHandler = () => {
  const { toggleModal } = useContext(ModalContext);
  return (
    <div className={styles.authHandler}>
      <button
        className={`${formStyles.btn} ${formStyles.primary}`}
        onClick={() => toggleModal("Login")}>
        Login
      </button>
    </div>
  );
};

export default AuthHandler;
