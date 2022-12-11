"use client";
import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import ModalContext from "@/context/ModalContext";
import BoardActions from "../Modals/mini/BoardActions";
import SettingsContext from "@/context/SettingsContext";
import Image from "next/image";

function Header() {
  const { toggleModal } = useContext(ModalContext);
  const { hideSidebar, theme } = useContext(SettingsContext);
  const [show, setShow] = useState(false);

  return (
    <header className={`${styles.header} ${hideSidebar && styles.full}`}>
      <div className={styles.innerCover}>
        <div className={styles.leftSide}>
          <Image
            priority
            src={`/assets/logo-${theme === "dark" ? "light" : "dark"}.svg`}
            width={152.53}
            height={25.22}
            alt="logo-dark"
          />
          <h1>Platform Launch</h1>
        </div>
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
