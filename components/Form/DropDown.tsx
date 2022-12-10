"use client";
import React, { useState } from "react";
import ChevronDown from "../../public/assets/icon-chevron-down.svg";
import ChevronUp from "../../public/assets/icon-chevron-up.svg";
import styles from "./styles.module.css";

const DropDown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropDownWrapper}>
      {!open ? <ChevronDown /> : <ChevronUp />}
      <select onClick={() => setOpen(!open)}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel" selected>
          Opel
        </option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

export default DropDown;
