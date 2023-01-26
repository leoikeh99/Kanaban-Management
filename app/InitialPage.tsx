"use client";
import React, { useContext } from "react";
import { Session } from "next-auth";
import styles from "./styles.module.css";
import Unauthenticated from "@/components/Auth/Unauthenticated";
import NoBoards from "@/components/Board/NoBoards";
import Board from "./[id]/Board";
import SettingsContext from "@/context/SettingsContext";

const InitialPage = ({
  board,
  session,
}: {
  board: Board;
  session: Session | null;
}) => {
  const { hideSidebar } = useContext(SettingsContext);

  return (
    <div className={`${styles.wrapper} ${hideSidebar && styles.full}`}>
      {!session?.user ? (
        <Unauthenticated />
      ) : session.user && !board ? (
        <NoBoards />
      ) : (
        <>
          {/* @ts-ignore */}
          <Board board={board} />
        </>
      )}
    </div>
  );
};

export default InitialPage;
