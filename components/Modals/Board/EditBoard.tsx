"use client";
import React, { useContext, useState } from "react";
import ModalContext from "@/context/ModalContext";
import IconCross from "@/public/assets/icon-cross.svg";
import styles from "../styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/public/assets/loader.svg";
import { Alert } from "antd";
import UserContext from "@/context/UserContext";
import { validateBoard } from "app/utils";

interface Status {
  name: string;
  id: string;
  new?: boolean;
  edited?: boolean;
  deleted?: boolean;
}

const EditBoard = () => {
  const { toggleModal } = useContext(ModalContext);
  const { currentBoard, changeCurrentBoard, changeBoardName } =
    useContext(UserContext);
  const [name, setName] = useState(currentBoard?.name);
  const [status, setStatus] = useState<Status[] | []>(
    currentBoard ? currentBoard.Status : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [errors, setErrors] = useState<ValidateBoardErrors>([]);

  const addCloumn = () =>
    setStatus([...status, { name: "", id: uuidv4(), new: true }]);

  const removeColumn = (id: string) => {
    const column = status.find((val) => val.id === id);
    if (column?.new) {
      setStatus(status.filter((val) => val.id !== id));
    } else {
      setStatus(
        status.map((val) => (val.id === id ? { ...val, deleted: true } : val))
      );
    }
  };

  const handleChange = (id: string, value: string) =>
    setStatus(
      status.map((val) =>
        val.id === id ? { ...val, name: value, edited: true } : val
      )
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    const validate = validateBoard({ name, status });
    setErrors(validate);
    if (validate.length !== 0) return;

    const data = {
      name,
      status: status.filter((val) => val.edited || val.deleted || val.new),
    };
    setLoading(true);

    await fetch(`/api/boards/edit/${currentBoard?.id}`, {
      method: "PUT",
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
          changeCurrentBoard(response.board);
          changeBoardName(response.board.id, response.board.name);
          setLoading(false);
          toggleModal(null);
        });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setLoading(false);
        console.log(error);
        setError(error.message);
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleModal(null)} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h3>Edit Board</h3>
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <span className={formStyles.error}>
                {errors.find((val) => val.name === "name")?.message}
              </span>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="e.g. Web Design"
                name="board_name"
                className={
                  errors.find((val) => val.name === "name") && formStyles.error
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="columns">Columns</label>
              {status
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
                      placeholder="e.g. Todo"
                      name="column_name"
                      value={val.name}
                      className={
                        errors.find((_val) => _val.id === val.id) &&
                        formStyles.error
                      }
                      onChange={(e) => handleChange(val.id, e.target.value)}
                    />
                    <button onClick={() => removeColumn(val.id)}>
                      <IconCross />
                    </button>
                  </div>
                ))}
              <button
                type="button"
                className={`${formStyles.btn} ${formStyles.secondary}`}
                onClick={addCloumn}>
                Add Column
              </button>
            </div>
            <button
              type="submit"
              className={`${formStyles.btn} ${formStyles.primary}`}>
              {loading && <Loader />} Save Changes
            </button>
            {error && (
              <>
                <br />
                <Alert message={error} type="error" />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBoard;
