"use client";
import React, { useContext } from "react";
import IconCross from "@/public/assets/icon-cross.svg";
import styles from "../styles.module.css";
import formStyles from "../formStyles.module.css";
import DropDown from "../../Form/DropDown";
import ModalContext from "@/context/ModalContext";

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
          <h3>Add New Task</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <label htmlFor="title">Title</label>
              <input type="text" placeholder="e.g. Take coffee break" />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
              />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="subtasks">Subtasks</label>
              <div className={styles.subTaskInput}>
                <input type="text" placeholder="e.g. Make coffee" />
                <IconCross />
              </div>
              <div className={styles.subTaskInput}>
                <input type="text" />
                <IconCross />
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
