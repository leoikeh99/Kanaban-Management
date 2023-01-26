"use client";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import Link from "next/link";
import ModalContext from "@/context/ModalContext";

const Error = () => {
  const { boards } = useContext(UserContext);
  const { toggleModal } = useContext(ModalContext);
  return (
    <div className={styles.error}>
      <h3>Invalid Board</h3>
      {boards[0] ? (
        <p>{`This is an invalid board, try your ${boards[0].name} board.`}</p>
      ) : (
        <p>This is an invalid board, try creating a board.</p>
      )}
      {boards[0] ? (
        <Link
          href={`/${boards[0].id}`}
          className={`${formStyles.btn} ${formStyles.primary}`}
          style={{ maxWidth: "300px" }}>
          Go to {boards[0].name}
        </Link>
      ) : (
        <button
          className={`${formStyles.btn} ${formStyles.primary}`}
          style={{ maxWidth: "300px" }}
          onClick={() => toggleModal("Add Board")}>
          + Create board
        </button>
      )}
    </div>
  );
};

export default Error;
