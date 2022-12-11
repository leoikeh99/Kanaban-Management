"use client";
import React, { useState, createContext, useEffect } from "react";

type SettingsContextState = {
  theme: "light" | "dark";
  hideSidebar: Boolean;
  toggleTheme: Function;
  toggleSidebar: Function;
};

const contextDefaultValues: SettingsContextState = {
  theme: "light",
  hideSidebar: false,
  toggleTheme: () => {},
  toggleSidebar: () => {},
};

const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValues);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(contextDefaultValues.theme);
  const [hideSidebar, setHideSidebar] = useState(
    contextDefaultValues.hideSidebar
  );

  useEffect(() => {
    const _theme = localStorage.getItem("theme");
    !theme && localStorage.setItem("theme", "light");

    setTheme(_theme === "light" || _theme === "dark" ? _theme : "light");
    document.documentElement.className =
      _theme === "light" || _theme === "dark" ? _theme : "light";
  }, []);

  const toggleTheme = () => {
    let newTheme: "light" | "dark" = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };
  const toggleSidebar = () => setHideSidebar(!hideSidebar);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        hideSidebar,
        toggleTheme,
        toggleSidebar,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
