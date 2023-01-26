"use client";
import React, { useState, createContext } from "react";

type DnDContextState = {
  currentDrag: Task | null;
  startDrag: Function;
  endDrag: Function;
};

const contextDefaultValues: DnDContextState = {
  currentDrag: null,
  startDrag: () => {},
  endDrag: () => {},
};

const DnDContext = createContext<DnDContextState>(contextDefaultValues);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDrag, setCurrentDrag] = useState(
    contextDefaultValues.currentDrag
  );

  const startDrag = (task: Task) => setCurrentDrag(task);
  const endDrag = () => setCurrentDrag(null);

  return (
    <DnDContext.Provider
      value={{
        currentDrag,
        startDrag,
        endDrag,
      }}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;
