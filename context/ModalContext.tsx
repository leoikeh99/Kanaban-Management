"use client";
import React, { useState, createContext } from "react";

type ModalTypes = null | "Add Task" | "Edit Task";

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

  const toggleModal = (modalName: ModalTypes) => setActiveModal(modalName);

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
