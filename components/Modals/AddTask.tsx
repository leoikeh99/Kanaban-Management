"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import IconCheck from "../../public/assets/icon-check.svg";
import ModalContext from "../../context/ModalContext";
import DropDown from "../Form/DropDown";

const AddTask = () => {
  const { toggleModal } = useContext(ModalContext);
  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <h3>
          Research pricing points of various competitors and trial different
          business models
        </h3>
        <p className={styles.desc}>
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>
        <p className={styles.subTitle}>Subtasks (2 of 3)</p>
        <div className={styles.subTasks}>
          <div className={styles.subTask}>
            <button className={styles.completed}>
              <IconCheck />
            </button>
            <p className={styles.completed}>
              Research competitor pricing and business models
            </p>
          </div>
          <div className={styles.subTask}>
            <button className={styles.completed}>
              <IconCheck />
            </button>
            <p className={styles.completed}>
              Outline a business model that works for our solution
            </p>
          </div>
          <div className={styles.subTask}>
            <button />
            <p>
              Talk to potential customers about our proposed solution and ask
              for fair price expectancy
            </p>
          </div>
        </div>
        <DropDown />
      </div>
    </>
  );
};

export default AddTask;
