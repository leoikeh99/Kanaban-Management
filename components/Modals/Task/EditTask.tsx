"use client";
import React, { useContext } from "react";
import ModalContext from "@/context/ModalContext";
import IconCross from "@/public/assets/icon-cross.svg";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import DropDown from "../../Form/DropDown";

const AddTask = () => {
  const { toggleModal } = useContext(ModalContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3>Edit Task</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <label htmlFor="title">Title</label>
              <input type="text" />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="subtasks">Subtasks</label>
              <div className={styles.subTaskInput}>
                <input type="text" />
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
                + Add New Subtask
              </button>
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="status">Status</label>
              <DropDown />
            </div>
            <button
              type="submit"
              className={`${formStyles.btn} ${formStyles.primary}`}>
              Create Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
