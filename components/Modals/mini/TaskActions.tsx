"use client";
import React, { useContext } from "react";
import ModalContext from "../../../context/ModalContext";
import styles from "./styles.module.css";

const TaskActions = ({ task }: { task: Task }) => {
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className={styles.miniModal}>
      <button onClick={() => toggleModal("Edit Task", task)}>Edit Task</button>
      <button onClick={() => toggleModal("Delete Task", task)}>
        Delete Task
      </button>
    </div>
  );
};

export default TaskActions;
