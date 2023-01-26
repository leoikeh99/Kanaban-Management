"use client";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";

const BoardEmpty = () => {
  const { toggleModal } = useContext(ModalContext);
  return (
    <div className={styles.emptyBoard}>
      <p>This board is empty. Create a new column to get started.</p>
      <button
        className={`${formStyles.btn} ${formStyles.primary}`}
        style={{ width: "170px", margin: "32px auto 0 auto" }}
        onClick={() => toggleModal("Edit Board")}>
        + Create Column
      </button>
    </div>
  );
};

export default BoardEmpty;
