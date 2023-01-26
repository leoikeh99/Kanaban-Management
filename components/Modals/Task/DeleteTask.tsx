"use client";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import UserContext from "@/context/UserContext";
import Loader from "@/public/assets/loader.svg";

const DeleteTask = () => {
  const { toggleModal, modalData } = useContext(ModalContext);
  const { deleteTask, response } = useContext(UserContext);

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3 className={styles.danger}>Delete this task?</h3>
          <p className={styles.desc}>
            Are you sure you want to delete the {`‘${modalData.title}’`} task
            and its subtasks? This action cannot be reversed.
          </p>
          <div className={styles.btns}>
            <button
              className={`${formStyles.btn} ${formStyles.danger}`}
              onClick={() => deleteTask(modalData)}
              disabled={response.loading}>
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

export default DeleteTask;
