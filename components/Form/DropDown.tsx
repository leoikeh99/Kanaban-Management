import React from "react";
import Chevron from "../../public/assets/icon-chevron-down.svg";
import styles from "./styles.module.css";

const DropDown = () => {
  return (
    <button className={styles.dropDown}>
      Doing <Chevron />
    </button>
  );
};

export default DropDown;
