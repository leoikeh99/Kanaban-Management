"use client";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import ChevronDown from "../../public/assets/icon-chevron-down.svg";
import ChevronUp from "../../public/assets/icon-chevron-up.svg";
import styles from "./styles.module.css";

type Props = {
  selectedStatus: string | undefined;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const DropDown = ({ selectedStatus, handleChange }: Props) => {
  const [open, setOpen] = useState(false);
  const { currentBoard } = useContext(UserContext);

  return (
    <div className={styles.dropDownWrapper}>
      {!open ? <ChevronDown /> : <ChevronUp />}
      {currentBoard && (
        <select
          name="statusId"
          onClick={() => setOpen(!open)}
          onChange={handleChange}
          defaultValue={
            currentBoard.Status.find((val) => val.id === selectedStatus)?.id
          }>
          {currentBoard.Status.map((val) => (
            <option key={val.id} value={val.id}>
              {val.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DropDown;
