"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import ModalContext from "@/context/ModalContext";
import BoardActions from "../Modals/mini/BoardActions";
import SettingsContext from "@/context/SettingsContext";
import Image from "next/image";
import MobileLogo from "@/public/assets/logo-mobile.svg";
import ChevronDown from "@/public/assets/icon-chevron-down.svg";
import ChevronUp from "@/public/assets/icon-chevron-up.svg";
import AddIcon from "@/public/assets/icon-add-task-mobile.svg";
import { usePathname } from "next/navigation";
import UserContext from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { MobileMenu } from "./MobileMenu";

function Header() {
  const { toggleModal } = useContext(ModalContext);
  const { hideSidebar, theme } = useContext(SettingsContext);
  const {
    boards,
    response: { type, loading },
  } = useContext(UserContext);
  const session = useSession();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    if (window.innerWidth >= 685) return;
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setId(pathname ? pathname.toString().substring(1) : "");
  }, [pathname]);

  return (
    <header className={`${styles.header} ${hideSidebar && styles.full}`}>
      <div className={styles.innerCover}>
        {showMenu && <MobileMenu closeMenu={() => setShowMenu(false)} />}
        <div className={styles.leftSide}>
          <Image
            priority
            src={`/assets/logo-${theme === "dark" ? "light" : "dark"}.svg`}
            width={152.53}
            height={25.22}
            alt="logo-dark"
          />
          <button className={styles.button2} onClick={toggleMenu}>
            <MobileLogo />
            <h1
              className={
                (session.status === "loading" && boards.length === 0) ||
                (type === "boardList" && loading && boards.length === 0)
                  ? styles.skeleton
                  : ""
              }>
              {session.status === "unauthenticated"
                ? ""
                : session.status !== "loading" && boards.length > 0 && id === ""
                ? boards[0].name
                : boards.find((val) => val.id === id)?.name}
            </h1>
            {showMenu ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        <div className={styles.rightSide}>
          <button
            className={styles.button}
            onClick={() => {
              toggleModal("Add Task");
              setShowMenu(false);
            }}>
            <AddIcon />
            <span>+ Add New Task</span>
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
