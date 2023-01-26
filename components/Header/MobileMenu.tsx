import UserContext from "@/context/UserContext";
import React, { useContext } from "react";
import AuthHandler from "../Auth/AuthHandler";
import Boards from "../Sidebar/Boards";
import { ThemeSwitcher } from "../Sidebar/ThemeSwitcher";
import styles from "./styles.module.css";

export const MobileMenu = ({ closeMenu }: { closeMenu: Function }) => {
  const { boards } = useContext(UserContext);
  return (
    <>
      <button className={styles.overlay} onClick={() => closeMenu()}></button>
      <div className={styles.mobileMenu}>
        <p className={styles.title}>{`ALL BOARDS (${boards.length})`}</p>
        <Boards />
        <div style={{ padding: "8px" }}></div>
        <AuthHandler />
        <ThemeSwitcher />
      </div>
    </>
  );
};
