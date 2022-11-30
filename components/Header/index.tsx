"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import Ellipsis from "../../public/assets/icon-vertical-ellipsis.svg";
import ModalContext from "../../context/ModalContext";
import AddTask from "../Modals/AddTask";

function Header() {
  const { activeModal, toggleModal } = useContext(ModalContext);

  return (
    <header className={styles.header}>
      <h1>Platform Launch</h1>
      <div className={styles.rightSide}>
        <button
          className={styles.button}
          onClick={() => toggleModal("Add Task")}>
          + Add New Task
        </button>
        <button className={styles.emptyButton}>
          <Ellipsis />
        </button>
      </div>
      {activeModal === "Add Task" && <AddTask />}
    </header>
  );
}

export default Header;
