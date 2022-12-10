"use client";
import React, { useContext } from "react";
import ModalContext from "../../context/ModalContext";
import styles from "./styles.module.css";

const Task = () => {
  const { toggleModal } = useContext(ModalContext);
  return (
    <button className={styles.task} onClick={() => toggleModal("View Task")}>
      <h6>Review results of usability tests and iterate</h6>
      <p>3 of 3 substasks</p>
    </button>
  );
};

export default Task;
