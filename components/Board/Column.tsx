"use client";
import React from "react";
import styles from "./styles.module.css";
import Task from "./Task";
import colors from "../../app/colors.json";
import { BottomDrop } from "./BottomDrop";

const Column = ({ status, index }: { status: Status; index: number }) => {
  return (
    <div className={styles.column}>
      <h5>
        <span style={{ background: colors.colorCodes[index] }} />
        {status.name.toLocaleUpperCase()}
      </h5>
      {status.Task.sort((a, b) => a.rank - b.rank).map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <BottomDrop statusId={status.id} />
    </div>
  );
};

export default Column;
