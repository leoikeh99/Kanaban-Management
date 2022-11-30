"use client";
import React from "react";
import Column from "../../components/Board/Column";
import styles from "./styles.module.css";

const Board = () => {
  return (
    <div className={styles.board}>
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default Board;
