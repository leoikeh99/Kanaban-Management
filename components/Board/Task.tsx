"use client";
import DnDContext from "@/context/DnDContext";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import ModalContext from "../../context/ModalContext";
import styles from "./styles.module.css";

const Task = ({ task }: { task: Task }) => {
  const { toggleModal } = useContext(ModalContext);
  const { startDrag, endDrag, currentDrag } = useContext(DnDContext);
  const { dropTask } = useContext(UserContext);

  const dragStart = () => {
    startDrag(task);
  };

  const drop = () => {
    dropTask(currentDrag, task);
  };

  const dragOver = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const dragEnd = () => {
    endDrag();
  };

  return (
    <>
      <button
        className={styles.task}
        onClick={() => toggleModal("View Task", task)}
        draggable
        onDragStart={dragStart}
        onDrop={drop}
        onDragOver={dragOver}
        onDragEnd={dragEnd}>
        <h6>{task.title}</h6>
        <p>
          {task.subtask.filter((val) => val.completed).length} of{" "}
          {task.subtask.length} substasks
        </p>
      </button>
    </>
  );
};

export default Task;
