"use client";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import UserContext from "@/context/UserContext";
import Loader from "@/public/assets/loader.svg";

const DeleteBoard = () => {
  const { toggleModal } = useContext(ModalContext);
  const { currentBoard, response, deleteBoard } = useContext(UserContext);

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3 className={styles.danger}>Delete this board?</h3>
          <p className={styles.desc}>
            Are you sure you want to delete the ‘{`${currentBoard?.name}`}’
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </p>
          <div className={styles.btns}>
            <button
              className={`${formStyles.btn} ${formStyles.danger}`}
              disabled={response.loading}
              onClick={() => deleteBoard()}>
              {response.loading && <Loader />}
              Delete
            </button>
            <button
              className={`${formStyles.btn} ${formStyles.secondary}`}
              disabled={response.loading}
              onClick={() => toggleModal(null)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBoard;
