"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import BoardIcon from "@/public/assets/icon-board.svg";
import HideIcon from "@/public/assets/icon-hide-sidebar.svg";
import IconLight from "@/public/assets/icon-light-theme.svg";
import IconDark from "@/public/assets/icon-dark-theme.svg";
import Link from "next/link";
import ModalContext from "@/context/ModalContext";
import AuthHandler from "../Auth/AuthHandler";
import SettingsContext from "@/context/SettingsContext";

const Sidebar = () => {
  const { toggleModal } = useContext(ModalContext);
  const { theme, toggleTheme } = useContext(SettingsContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image
          priority
          src={`/assets/logo-${theme === "dark" ? "light" : "dark"}.svg`}
          width={152.53}
          height={25.22}
          alt="logo-dark"
        />
      </div>
      <p className={styles.title}>ALL BOARDS (3)</p>
      <div className={styles.boards}>
        <Link href="/1" className={`${styles.active}`}>
          <BoardIcon />
          Platform Launch
        </Link>
        <Link href="/1">
          <BoardIcon />
          Marketing Plan
        </Link>
        <Link href="/1">
          <BoardIcon />
          Roadmap
        </Link>
        <button className={styles.btn} onClick={() => toggleModal("Add Board")}>
          <BoardIcon />+ Create New Board
        </button>
      </div>
      <div className={styles.bottomSection}>
        <AuthHandler />
        <div className={styles.themeSwitcher}>
          <IconLight />
          <button
            className={`${styles.toggleSwitch} ${
              theme === "light" ? styles.light : styles.dark
            }`}
            onClick={() => toggleTheme()}
          />
          <IconDark />
        </div>
        <button className={styles.hideBtn}>
          <HideIcon /> Hide Sidebar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
