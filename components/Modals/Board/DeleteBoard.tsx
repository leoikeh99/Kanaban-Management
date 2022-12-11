"use client";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";

const DeleteBoard = () => {
  const { toggleModal } = useContext(ModalContext);

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3 className={styles.danger}>Delete this board?</h3>
          <p className={styles.desc}>
            Are you sure you want to delete the ‘Platform Launch’ board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
          <div className={styles.btns}>
            <button className={`${formStyles.btn} ${formStyles.danger}`}>
              Delete
            </button>
            <button className={`${formStyles.btn} ${formStyles.secondary}`}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBoard;
