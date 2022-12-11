"use client";
import React, { useContext } from "react";
import ModalContext from "@/context/ModalContext";
import IconCross from "@/public/assets/icon-cross.svg";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";

const AddBoard = () => {
  const { toggleModal } = useContext(ModalContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3>Add New Board</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="e.g. Web Design" />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="columns">Columns</label>
              <div className={styles.subTaskInput}>
                <input type="text" placeholder="stuff" />
                <button>
                  <IconCross />
                </button>
              </div>
              <div className={styles.subTaskInput}>
                <input type="text" />
                <button>
                  <IconCross />
                </button>
              </div>
              <button
                type="button"
                className={`${formStyles.btn} ${formStyles.secondary}`}>
                + Add New Column
              </button>
            </div>
            <button
              type="submit"
              className={`${formStyles.btn} ${formStyles.primary}`}>
              Create Board
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBoard;
