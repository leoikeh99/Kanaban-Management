"use client";
import React, { useState, createContext } from "react";

type ModalTypes =
  | null
  | "View Task"
  | "Add Task"
  | "Edit Task"
  | "Add Board"
  | "Edit Board"
  | "Delete Task"
  | "Delete Board"
  | "Login"
  | "Register";

type ModalContextState = {
  activeModal: ModalTypes;
  toggleModal: Function;
};

const contextDefaultValues: ModalContextState = {
  activeModal: null,
  toggleModal: () => {},
};

const ModalContext = createContext<ModalContextState>(contextDefaultValues);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModal, setActiveModal] = useState(
    contextDefaultValues.activeModal
  );

  const toggleModal = (modalName: ModalTypes) =>
    activeModal === modalName
      ? setActiveModal(null)
      : setActiveModal(modalName);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        toggleModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
