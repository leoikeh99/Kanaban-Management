"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import AddBoard from "../Modals/Board/AddBoard";

const NoBoards = () => {
  const { toggleModal, activeModal } = useContext(ModalContext);

  return (
    <div className={styles.noBoards}>
      <div className={styles.inner}>
        <h1>Lets get started ⚡</h1>
        <p>You currently have no boards, try creaating a board.</p>

        <button
          className={`${formStyles.btn} ${formStyles.primary}`}
          style={{ maxWidth: "300px" }}
          onClick={() => toggleModal("Add Board")}>
          + Create board
        </button>
      </div>
      {activeModal === "Add Board" && <AddBoard />}
    </div>
  );
};

export default NoBoards;
