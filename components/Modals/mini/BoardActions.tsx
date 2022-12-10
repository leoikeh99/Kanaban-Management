"use client";
import React, { useContext } from "react";
import ModalContext from "../../../context/ModalContext";
import styles from "./styles.module.css";

const BoardActions = () => {
  const { toggleModal } = useContext(ModalContext);
  return (
    <div className={styles.miniModal}>
      <button onClick={() => toggleModal("Edit Board")}>Edit Board</button>
      <button onClick={() => toggleModal("Delete Board")}>Delete Board</button>
    </div>
  );
};

export default BoardActions;
