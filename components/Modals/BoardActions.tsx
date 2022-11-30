import React from "react";
import styles from "./styles.module.css";

const BoardActions = () => {
  return (
    <div className={styles.boardActions}>
      <button>Edit Board</button>
      <button>Delete Board</button>
    </div>
  );
};

export default BoardActions;
