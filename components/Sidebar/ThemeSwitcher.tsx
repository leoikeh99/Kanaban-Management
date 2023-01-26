import React, { useContext } from "react";
import styles from "./styles.module.css";
import IconLight from "@/public/assets/icon-light-theme.svg";
import IconDark from "@/public/assets/icon-dark-theme.svg";
import SettingsContext from "@/context/SettingsContext";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(SettingsContext);

  return (
    <div className={styles.themeSwitcher}>
      <IconLight />
      <button
        className={`${styles.toggleSwitch} ${
          theme === "light" ? styles.light : styles.dark
        }`}
        onClick={() => toggleTheme()}
      />
      <IconDark />
    </div>
  );
};
