import { useNavigate } from "react-router-dom";
import React from "react";
import { ChanePathProps } from "../../types";

const ChangePath = ( {path}: ChanePathProps) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(path);
  },[path,navigate]);
  return <div></div>;
};

export default ChangePath;
