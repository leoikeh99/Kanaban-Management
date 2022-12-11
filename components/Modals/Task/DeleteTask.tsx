"use client";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";

const DeleteTask = () => {
  const { toggleModal } = useContext(ModalContext);

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3 className={styles.danger}>Delete this task?</h3>
          <p className={styles.desc}>
            Are you sure you want to delete the ‘Build settings UI’ task and its
            subtasks? This action cannot be reversed.
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

export default DeleteTask;
