"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import HideIcon from "@/public/assets/icon-hide-sidebar.svg";
import AuthHandler from "../Auth/AuthHandler";
import SettingsContext from "@/context/SettingsContext";
import UserContext from "@/context/UserContext";
import Boards from "./Boards";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Sidebar = () => {
  const { boards } = useContext(UserContext);
  const { theme, hideSidebar, toggleTheme, toggleSidebar } =
    useContext(SettingsContext);

  return (
    <div className={`${styles.wrapper} ${hideSidebar && styles.hidden}`}>
      <div className={styles.logo}>
        <Image
          priority
          src={`/assets/logo-${theme === "dark" ? "light" : "dark"}.svg`}
          width={152.53}
          height={25.22}
          alt="logo-dark"
        />
      </div>
      <p className={styles.title}>{`ALL BOARDS (${boards.length})`}</p>
      <Boards />

      <div className={styles.bottomSection}>
        <AuthHandler />
        <ThemeSwitcher />
        <button className={styles.hideBtn} onClick={() => toggleSidebar()}>
          <HideIcon /> Hide Sidebar
        </button>
        {hideSidebar && (
          <button className={styles.showBtn} onClick={() => toggleSidebar()}>
            <HideIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
