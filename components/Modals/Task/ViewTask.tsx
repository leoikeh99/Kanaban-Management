"use client";
import React, { useContext, useState } from "react";
import styles from "../styles.module.css";
import IconCheck from "@/public/assets/icon-check.svg";
import ModalContext from "@/context/ModalContext";
import DropDown from "../../Form/DropDown";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import TaskActions from "../mini/TaskActions";

const ViewTask = () => {
  const { toggleModal, activeModal } = useContext(ModalContext);
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalTop}>
            <h3>
              Research pricing points of various competitors and trial different
              business models
            </h3>
            <button onClick={() => setShow(!show)}>
              <Ellipsis />
            </button>
            {show && (
              <div className={styles.miniModal}>
                <TaskActions />
              </div>
            )}
          </div>
          <p className={styles.desc}>
            We know what we're planning to build for version one. Now we need to
            finalise the first pricing model we'll use. Keep iterating the
            subtasks until we have a coherent proposition.
          </p>
          <p className={styles.subTitle}>Subtasks (2 of 3)</p>
          <div className={styles.subTasks}>
            <button className={styles.subTask}>
              <button className={styles.completed}>
                <IconCheck />
              </button>
              <p className={styles.completed}>
                Research competitor pricing and business models
              </p>
            </button>
            <button className={styles.subTask}>
              <button className={styles.completed}>
                <IconCheck />
              </button>
              <p className={styles.completed}>
                Outline a business model that works for our solution
              </p>
            </button>
            <button className={styles.subTask}>
              <button />
              <p>
                Talk to potential customers about our proposed solution and ask
                for fair price expectancy
              </p>
            </button>
          </div>
          <DropDown />
        </div>
      </div>
    </>
  );
};

export default ViewTask;
