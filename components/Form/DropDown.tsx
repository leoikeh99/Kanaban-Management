"use client";
import React, { useState } from "react";
import ChevronDown from "../../public/assets/icon-chevron-down.svg";
import ChevronUp from "../../public/assets/icon-chevron-up.svg";
import styles from "./styles.module.css";

const DropDown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropDownWrapper}>
      <button className={styles.dropDown} onClick={() => setOpen(!open)}>
        Doing {open ? <ChevronDown /> : <ChevronUp />}
      </button>
      {open && (
        <div className={styles.dropDownList}>
          <button className={styles.dropDownItem}>Todo</button>
          <button className={styles.dropDownItem}>Doing</button>
          <button className={styles.dropDownItem}>Done</button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
