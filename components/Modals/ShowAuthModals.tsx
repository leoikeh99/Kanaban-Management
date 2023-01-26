"use client";
import React, { useContext } from "react";
import Login from "@/components/Modals/Auth/Login";
import Register from "@/components/Modals/Auth/Register";
import ModalContext from "@/context/ModalContext";

const ShowAuthModals = () => {
  const { activeModal } = useContext(ModalContext);
  return (
    <>
      {activeModal === "Login" && <Login />}
      {activeModal === "Register" && <Register />}
    </>
  );
};

export default ShowAuthModals;
