"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import Column from "@/components/Board/Column";
import AddTask from "@/components/Modals/Task/AddTask";
import ViewTask from "@/components/Modals/Task/ViewTask";
import EditTask from "@/components/Modals/Task/EditTask";
import ModalContext from "@/context/ModalContext";
import AddBoard from "@/components/Modals/Board/AddBoard";
import EditBoard from "@/components/Modals/Board/EditBoard";
import DeleteTask from "@/components/Modals/Task/DeleteTask";
import DeleteBoard from "@/components/Modals/Board/DeleteBoard";
import Login from "@/components/Modals/Auth/Login";
import Register from "@/components/Modals/Auth/Register";

const Board = () => {
  const { activeModal } = useContext(ModalContext);
  return (
    <div className={styles.board}>
      <Column />
      <Column />
      <Column />
      {activeModal === "View Task" && <ViewTask />}
      {activeModal === "Add Task" && <AddTask />}
      {activeModal === "Edit Task" && <EditTask />}
      {activeModal === "Add Board" && <AddBoard />}
      {activeModal === "Edit Board" && <EditBoard />}
      {activeModal === "Delete Task" && <DeleteTask />}
      {activeModal === "Delete Board" && <DeleteBoard />}
      {activeModal === "Login" && <Login />}
      {activeModal === "Register" && <Register />}
    </div>
  );
};

export default Board;
