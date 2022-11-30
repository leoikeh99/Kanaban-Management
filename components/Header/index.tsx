"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import Ellipsis from "../../public/assets/icon-vertical-ellipsis.svg";
import ModalContext from "../../context/ModalContext";
import AddTask from "../Modals/AddTask";
import BoardActions from "../Modals/BoardActions";

function Header() {
  const { activeModal, toggleModal } = useContext(ModalContext);

  return (
    <header className={styles.header}>
      <div className={styles.innerCover}>
        <h1>Platform Launch</h1>
        <div className={styles.rightSide}>
          <button
            className={styles.button}
            onClick={() => toggleModal("Add Task")}>
            + Add New Task
          </button>
          <button
            style={{ padding: "7px" }}
            className={styles.emptyButton}
            onClick={() => toggleModal("Board Actions")}>
            <Ellipsis />
          </button>
        </div>
        {activeModal === "Board Actions" && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => toggleModal(null)}
            />
            <BoardActions />
          </>
        )}
        {activeModal === "Add Task" && <AddTask />}
      </div>
    </header>
  );
}

export default Header;
