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

const AddTask = () => {
  const { toggleModal } = useContext(ModalContext);
  const { currentBoard, addTask } = useContext(UserContext);
  const [_response, setRepsonse] = useState({ loading: false, error: null });
  const [errors, setErrors] = useState<ValidateTaskErrors>([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    subtasks: [{ name: "", id: uuidv4() }],
    statusId: currentBoard?.Status[0].id,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setErrors(errors.filter((err) => err.name !== e.target.name));
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (_response.loading) return;
    const validate = validateTask(data);
    setErrors(validate);
    if (validate.length !== 0) return;

    setRepsonse({ ..._response, loading: true });
    await fetch(`/api/tasks/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }

        await res.json().then((response) => {
          setRepsonse({ ..._response, loading: false });
          addTask(response.task);
          toggleModal(null);
        });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setRepsonse({ ..._response, loading: false, error: error.message });
        setTimeout(() => setRepsonse({ ..._response, error: null }), 3000);
      });
  };

  const handleSubtask = (id: string, value: string) => {
    setErrors(errors.filter((err) => err.id !== id));
    setData({
      ...data,
      subtasks: data.subtasks.map((val) =>
        val.id === id ? { ...val, name: value } : val
      ),
    });
  };

  const addSubtask = () =>
    setData({
      ...data,
      subtasks: [...data.subtasks, { name: "", id: uuidv4() }],
    });

  const removeSubtask = (id: string) =>
    setData({
      ...data,
      subtasks: data.subtasks.filter((val) => val.id !== id),
    });

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3>Add New Task</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((err) => err.name === "title")?.message}
              </span>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className={
                  errors.find((err) => err.name === "title") && formStyles.error
                }
                placeholder="e.g. Take coffee break"
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
              {data.subtasks.map((val) => (
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
              {_response.loading && <Loader />}
              Create Task
            </button>
            {_response.error && (
              <>
                <br />
                <Alert message={_response.error} type="error" showIcon />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
