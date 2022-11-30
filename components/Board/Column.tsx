"use client";
import React from "react";
import styles from "./styles.module.css";
import Task from "./Task";

const Column = () => {
  return (
    <div className={styles.column}>
      <h5>TODO</h5>
      <Task />
    </div>
  );
};

export default Column;
