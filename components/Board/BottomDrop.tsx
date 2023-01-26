import DnDContext from "@/context/DnDContext";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";
import styles from "./styles.module.css";

export const BottomDrop = ({ statusId }: { statusId: string }) => {
  const { startDrag, endDrag, currentDrag } = useContext(DnDContext);
  const { dropTask } = useContext(UserContext);

  const drop = () => {
    dropTask(currentDrag, null, { statusId });
    const elem = document.getElementById(statusId);
    elem?.classList.contains(styles.dragOver) &&
      elem?.classList.remove(styles.dragOver);
  };

  const dragOver = (e: React.FormEvent) => {
    e.preventDefault();
    const elem = document.getElementById(statusId);
    !elem?.classList.contains(styles.dragOver) &&
      elem?.classList.add(styles.dragOver);
  };

  const dragLeave = () => {
    const elem = document.getElementById(statusId);
    elem?.classList.contains(styles.dragOver) &&
      elem?.classList.remove(styles.dragOver);
  };

  return (
    <div
      id={statusId}
      className={styles.bottomDrop}
      onDrop={drop}
      onDragOver={dragOver}
      onDragLeave={dragLeave}>
      Drop here
    </div>
  );
};
