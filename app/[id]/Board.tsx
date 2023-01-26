"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles.module.css";
import Column from "@/components/Board/Column";
import ShowBoardModals from "@/components/Modals/ShowBoardModals";
import ModalContext from "@/context/ModalContext";
import UserContext from "@/context/UserContext";
import BoardEmpty from "./BoardEmpty";

const Board = ({ board }: BoardPage) => {
  const { toggleModal } = useContext(ModalContext);
  const { changeCurrentBoard, currentBoard } = useContext(UserContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    changeCurrentBoard(board);
    setShow(true);
  }, []);

  return (
    <>
      {show && currentBoard && (
        <>
          {currentBoard.Status.length !== 0 ? (
            <div className={styles.board}>
              {currentBoard.Status.sort((a, b) => a.order - b.order).map(
                (status, index) => (
                  <Column key={status.id} status={status} index={index} />
                )
              )}
              <button
                className={styles.addColumn}
                onClick={() => toggleModal("Edit Board")}>
                + New Column
              </button>
            </div>
          ) : (
            <BoardEmpty />
          )}
          <ShowBoardModals />
        </>
      )}
    </>
  );
};

export default Board;
