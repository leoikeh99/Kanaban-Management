"use client";
import React, { useContext } from "react";
import ModalContext from "@/context/ModalContext";
import AddBoard from "@/components/Modals/Board/AddBoard";
import EditBoard from "@/components/Modals/Board/EditBoard";
import DeleteBoard from "@/components/Modals/Board/DeleteBoard";
import AddTask from "@/components/Modals/Task/AddTask";
import UserContext from "@/context/UserContext";
import ViewTask from "./Task/ViewTask";
import EditTask from "./Task/EditTask";
import DeleteTask from "./Task/DeleteTask";

const ShowBoardModals = () => {
  const { activeModal } = useContext(ModalContext);
  const { currentBoard } = useContext(UserContext);
  return (
    <>
      {activeModal === "View Task" && <ViewTask />}
      {activeModal === "Edit Task" && <EditTask />}
      {activeModal === "Delete Task" && <DeleteTask />}
      {activeModal === "Add Task" && <AddTask />}
      {activeModal === "Add Board" && currentBoard?.Status.length !== 0 && (
        <AddBoard />
      )}
      {activeModal === "Edit Board" && <EditBoard />}
      {activeModal === "Delete Board" && <DeleteBoard />}
    </>
  );
};

export default ShowBoardModals;
