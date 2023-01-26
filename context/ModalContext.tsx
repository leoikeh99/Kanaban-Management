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
  modalData: any;
  toggleModal: Function;
};

const contextDefaultValues: ModalContextState = {
  activeModal: null,
  modalData: null,
  toggleModal: () => {},
};

const ModalContext = createContext<ModalContextState>(contextDefaultValues);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModal, setActiveModal] = useState(
    contextDefaultValues.activeModal
  );
  const [modalData, setModalData] = useState(contextDefaultValues.modalData);

  const toggleModal = (modalName: ModalTypes, modalData: any = null) => {
    setActiveModal(modalName);
    setModalData(modalData);
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        modalData,
        toggleModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
