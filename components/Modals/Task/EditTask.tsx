"use client";
import React, { useContext, useState } from "react";
import IconCross from "@/public/assets/icon-cross.svg";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import DropDown from "../../Form/DropDown";
import ModalContext from "@/context/ModalContext";
import UserContext from "@/context/UserContext";
import Loader from "@/public/assets/loader.svg";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "antd";
import { validateTask } from "app/utils";

interface _Subtask extends SubTask {
  new?: boolean;
  deleted?: boolean;
  edited?: boolean;
}

const EditTask = () => {
  const { toggleModal, modalData } = useContext(ModalContext);
  const { editTask, response, currentBoard } = useContext(UserContext);
  const [data, setData] = useState({
    id: modalData.id,
    title: modalData.title,
    description: modalData.description,
    statusId: modalData.statusId,
    rank: modalData.rank,
  });
  const [subtasks, setSubtasks] = useState<_Subtask[] | []>(modalData.subtask);
  const [errors, setErrors] = useState<ValidateTaskErrors>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setErrors(errors.filter((err) => err.name !== e.target.name));
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "statusId") {
      if (e.target.value === modalData.statusId) {
        setData({ ...data, rank: modalData.rank, statusId: e.target.value });
      } else {
        const getStatus = currentBoard?.Status.find(
          (val) => val.id === e.target.value
        );
        if (currentBoard && getStatus) {
          setData({
            ...data,
            rank: getStatus.Task.length + 1,
            statusId: e.target.value,
          });
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (response.loading) return;
    const validate = validateTask({
      title: data.title,
      description: data.description,
      subtasks,
    });
    setErrors(validate);
    if (validate.length) return;

    const _data = { ...data, subtasks };
    editTask(_data, modalData.statusId);
  };

  const handleSubtask = (id: string, value: string) => {
    setErrors(errors.filter((val) => val.id !== id));
    setSubtasks(
      subtasks.map((val) =>
        val.id === id ? { ...val, name: value, edited: true } : val
      )
    );
  };

  const addSubtask = () => {
    setSubtasks([
      ...subtasks,
      {
        name: "",
        id: uuidv4(),
        taskId: modalData.id,
        new: true,
        order: subtasks.length + 1,
      },
    ]);
  };

  const removeSubtask = (id: string) => {
    const checkNew = subtasks.find((val) => val.id === id)?.new;

    if (checkNew) {
      setSubtasks(subtasks.filter((val) => val.id !== id));
      return;
    }

    setSubtasks(
      subtasks.map((val) => (val.id === id ? { ...val, deleted: true } : val))
    );
  };
  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3>Edit Task</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((err) => err.name === "title")?.message}
              </span>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="e.g. Take coffee break"
                className={
                  errors.find((err) => err.name === "title") && formStyles.error
                }
                name="title"
                onChange={handleChange}
                value={data.title}
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                name="description"
                onChange={handleChange}
                value={data.description}
              />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="subtasks">Subtasks</label>
              {subtasks
                .filter((val) => !val.deleted)
                .map((val) => (
                  <div
                    key={val.id}
                    className={`${formStyles.subTaskInput} ${
                      errors.find((_val) => _val.id === val.id) &&
                      formStyles.subtaskError
                    }`}>
                    <span>
                      {errors.find((_val) => _val.id === val.id)?.message}
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Make coffee"
                      className={
                        errors.find((_val) => _val.id === val.id) &&
                        formStyles.error
                      }
                      onChange={(e) => handleSubtask(val.id, e.target.value)}
                      value={val.name}
                    />
                    <button onClick={() => removeSubtask(val.id)}>
                      <IconCross />
                    </button>
                  </div>
                ))}
              <button
                type="button"
                className={`${formStyles.btn} ${formStyles.secondary}`}
                onClick={addSubtask}>
                + Add New Subtask
              </button>
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="status">Status</label>
              <DropDown
                selectedStatus={data.statusId}
                handleChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={`${formStyles.btn} ${formStyles.primary}`}>
              {response.loading && <Loader />}
              Save Changes
            </button>
            {response.error && (
              <>
                <br />
                <Alert message={response.error} type="error" showIcon />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
