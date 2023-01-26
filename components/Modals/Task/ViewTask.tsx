"use client";
import React, { useContext, useState } from "react";
import styles from "../styles.module.css";
import IconCheck from "@/public/assets/icon-check.svg";
import ModalContext from "@/context/ModalContext";
import DropDown from "../../Form/DropDown";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import TaskActions from "../mini/TaskActions";
import UserContext from "@/context/UserContext";

const ViewTask = () => {
  const { toggleModal, modalData } = useContext(ModalContext);
  const { changeStatus, toggleSubtask, currentBoard } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [statusId, setStatusId] = useState(modalData.statusId);
  const [task, setTask] = useState(
    currentBoard?.Status.find(
      (val) => val.id === modalData.statusId
    )?.Task.find((val) => val.id === modalData.id)
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === modalData.statusId) return;
    if (!currentBoard) return;
    setStatusId(e.target.value);
    const getStatus = currentBoard.Status.find(
      (val) => val.id === e.target.value
    );
    getStatus &&
      changeStatus(
        {
          ...currentBoard.Status.find(
            (val) => val.id === modalData.statusId
          )?.Task.find((val) => val.id === modalData.id),
          statusId: e.target.value,
          rank: getStatus.Task.length + 1,
        },
        modalData.statusId
      );
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalTop}>
            <h3>{modalData.title}</h3>
            <button onClick={() => setShow(!show)}>
              <Ellipsis />
            </button>
            {show && (
              <div className={styles.miniModal}>
                <TaskActions task={modalData} />
              </div>
            )}
          </div>
          <p className={styles.desc}>{modalData.description}</p>
          <p className={styles.subTitle}>{`Subtasks (${
            task?.subtask.filter((val) => val.completed).length
          } of ${task?.subtask.length})`}</p>
          <div className={styles.subTasks}>
            {currentBoard &&
              currentBoard.Status.find((val) => val.id === modalData.statusId)
                ?.Task.find((val) => val.id === modalData.id)
                ?.subtask.sort((a, b) => a.order - b.order)
                .map((subtask: SubTask) => (
                  <button
                    className={styles.subTask}
                    key={subtask.id}
                    onClick={() =>
                      toggleSubtask(
                        { taskId: subtask.taskId, subtaskId: subtask.id },
                        modalData.statusId
                      )
                    }>
                    <span className={subtask.completed ? styles.completed : ""}>
                      <IconCheck />
                    </span>
                    <p className={subtask.completed ? styles.completed : ""}>
                      {subtask.name}
                    </p>
                  </button>
                ))}
          </div>
          <p className={styles.subTitle} style={{ marginBottom: "8px" }}>
            Current status
          </p>
          <DropDown selectedStatus={statusId} handleChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default ViewTask;
