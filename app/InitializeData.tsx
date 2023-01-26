import UserContext from "@/context/UserContext";
import React, { useContext, useEffect } from "react";

const InitializeData = ({
  boards,
}: {
  boards: { id: string; name: string }[] | undefined;
}) => {
  const { initializeData } = useContext(UserContext);

  useEffect(() => {
    if (boards) {
      initializeData(boards);
    }
  }, []);
  return <></>;
};

export default InitializeData;
