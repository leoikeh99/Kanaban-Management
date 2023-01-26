"use client";
import SettingsContext from "@/context/SettingsContext";
import React, { useContext } from "react";
import styles from "./styles.module.css";

const Loading = () => {
  const { hideSidebar } = useContext(SettingsContext);
  return (
    <div className={`${styles.wrapper} ${hideSidebar && styles.full}`}>
      <div className={styles.board} style={{ fontSize: "100px" }}>
        <div className={`${styles.firstCol} ${hideSidebar && styles.full}`}>
          <span className={`${styles.title}`} />
          <div className={styles.column}>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
        </div>
        <div className={`${styles.secondCol} ${hideSidebar && styles.full}`}>
          <span className={`${styles.title}`} />
          <div className={styles.column}>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
        </div>
        <div className={`${styles.thirdCol} ${hideSidebar && styles.full}`}>
          <span className={`${styles.title}`} />
          <div className={styles.column}>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
