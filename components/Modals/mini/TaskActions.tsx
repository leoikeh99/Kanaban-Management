"use client";
import React, { useContext } from "react";
import ModalContext from "../../../context/ModalContext";
import styles from "./styles.module.css";

const TaskActions = () => {
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className={styles.miniModal}>
      <button onClick={() => toggleModal("Edit Task")}>Edit Task</button>
      <button onClick={() => toggleModal("Delete Task")}>Delete Task</button>
    </div>
  );
};

export default TaskActions;
