"use client";
import React, { useState, createContext, useEffect } from "react";

type SettingsContextState = {
  theme: "light" | "dark";
  changeTheme: Function;
};

const contextDefaultValues: SettingsContextState = {
  theme: "light",
  changeTheme: () => {},
};

const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValues);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(contextDefaultValues.theme);

  useEffect(() => {
    let localTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
    setTheme(
      localTheme === "light"
        ? "light"
        : localTheme === "dark"
        ? "dark"
        : "light"
    );
  }, []);

  const changeTheme = (): void =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <SettingsContext.Provider
      value={{
        theme,
        changeTheme,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
