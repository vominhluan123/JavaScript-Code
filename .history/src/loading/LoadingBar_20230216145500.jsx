import { LinearProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
const LoadingBar = () => {
  const [level, setLever] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLever((newLever) => (newLever >= 100 ? 0 : newLever + 10));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <LinearProgress
        value={level}
        color="primary"
        sx={{
          width: "200px",
        }}
      ></LinearProgress>
    </div>
  );
};

export default LoadingBar;
