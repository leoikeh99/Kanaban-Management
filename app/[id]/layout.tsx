"use client";
import SettingsContext from "@/context/SettingsContext";
import React, { useContext } from "react";
import styles from "../styles.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { hideSidebar } = useContext(SettingsContext);

  return (
    <div className={`${styles.wrapper} ${hideSidebar && styles.full}`}>
      {children}
    </div>
  );
}
