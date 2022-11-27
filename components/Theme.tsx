"use client";
import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import SettingsContext from "../context/SettingsContext";

const Theme = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(SettingsContext);
  return <ThemeProvider theme={{ theme }}>{children}</ThemeProvider>;
};

export default Theme;
