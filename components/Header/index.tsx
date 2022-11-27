import React from "react";
import styles from "./styles.module.css";
import Ellipsis from "../../public/assets/icon-vertical-ellipsis.svg";

function Header() {
  return (
    <header className={styles.header}>
      <h1>Platform Launch</h1>
      <div className={styles.rightSide}>
        <button className={styles.button}>+ Add New Task</button>
        <button className={styles.emptyButton}>
          <Ellipsis />
        </button>
      </div>
    </header>
  );
}

export default Header;
