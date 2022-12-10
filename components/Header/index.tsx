"use client";
import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import ModalContext from "@/context/ModalContext";
import BoardActions from "../Modals/mini/BoardActions";

function Header() {
  const { toggleModal } = useContext(ModalContext);
  const [show, setShow] = useState(false);

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
            onClick={() => setShow(!show)}>
            <Ellipsis />
          </button>
        </div>
        {show && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => setShow(false)}
            />
            <div className={styles.modalWrapper}>
              <BoardActions />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
