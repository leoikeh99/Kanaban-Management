"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BoardIcon from "@/public/assets/icon-board.svg";
import ModalContext from "@/context/ModalContext";
import { usePathname } from "next/navigation";
import UserContext from "@/context/UserContext";

const Boards = () => {
  const { toggleModal } = useContext(ModalContext);
  const {
    boards,
    response: { type, loading },
  } = useContext(UserContext);
  const session = useSession();
  const pathname = usePathname();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(pathname ? pathname.toString().substring(1) : "");
  }, [pathname]);

  return (
    <div className={styles.boards}>
      {session.status === "loading" || (type === "boardList" && loading) ? (
        <div>
          <div className={`${styles.btn} ${styles.skeleton}`}>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
          </div>
        </div>
      ) : session.status === "authenticated" ? (
        boards.map((board) => (
          <Link
            href={`/${board.id}`}
            className={`${
              (id === "" && board.id === boards[0].id) || board.id === id
                ? styles.active
                : null
            }`}
            key={board.id}>
            <BoardIcon />
            <span>{board.name}</span>
          </Link>
        ))
      ) : null}
      <button className={styles.btn} onClick={() => toggleModal("Add Board")}>
        <BoardIcon />+ Create New Board
      </button>
    </div>
  );
};

export default Boards;
