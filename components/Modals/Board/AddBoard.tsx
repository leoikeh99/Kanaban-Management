"use client";
import React, { useContext, useState } from "react";
import ModalContext from "@/context/ModalContext";
import IconCross from "@/public/assets/icon-cross.svg";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import { v4 as uuidv4 } from "uuid";
import UserContext from "@/context/UserContext";
import Loader from "@/public/assets/loader.svg";
import { Alert } from "antd";
import { validateBoard } from "app/utils";

interface Status {
  name: string;
  id: string;
}

const AddBoard = () => {
  const { toggleModal } = useContext(ModalContext);
  const {
    addBoard,
    response: { type, loading, error },
  } = useContext(UserContext);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status[] | []>([
    { id: uuidv4(), name: "" },
  ]);
  const [errors, setErrors] = useState<ValidateBoardErrors>([]);

  const addCloumn = () => setStatus([...status, { name: "", id: uuidv4() }]);

  const removeColumn = (id: string) => {
    if (status.length === 1) return;
    setStatus(status.filter((val) => val.id !== id));
  };

  const handleChange = (id: string, value: string) => {
    setErrors([]);
    setStatus(
      status.map((val) => (val.id === id ? { ...val, name: value } : val))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validate = validateBoard({ name, status });
    setErrors(validate);
    if (validate.length !== 0) return;
    addBoard({
      name,
      status: status.map((val) => {
        return { name: val.name };
      }),
    });
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3>Add New Board</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((val) => val.name === "name")?.message}
              </span>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="board_name"
                placeholder="e.g. Web Design"
                className={
                  errors.find((val) => val.name === "name") && formStyles.error
                }
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors([]);
                }}
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="columns">Columns</label>
              {status.map((val) => (
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
                    name="column_name"
                    placeholder="e.g. Todo"
                    className={
                      errors.find((_val) => _val.id === val.id) &&
                      formStyles.error
                    }
                    value={val.name}
                    onChange={(e) => handleChange(val.id, e.target.value)}
                  />
                  <button onClick={() => removeColumn(val.id)} type="button">
                    <IconCross />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={`${formStyles.btn} ${formStyles.secondary}`}
                onClick={addCloumn}>
                + Add New Column
              </button>
            </div>
            <button
              type="submit"
              disabled={type === "addBoard" && loading}
              className={`${formStyles.btn} ${formStyles.primary}`}>
              {type === "addBoard" && loading && <Loader />}
              Create Board
            </button>
            {error && (
              <>
                <br />
                <Alert message={error} type="error" showIcon />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBoard;
