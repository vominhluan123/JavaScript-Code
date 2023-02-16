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
    <>
      <Paper
        sx={{
          opacity: 0,
          pointerEvents: "none",
          transition: "all .3s ease",
        }}
      >
        <LinearProgress
          value={level}
          color="primary"
          sx={{
            width: "1580px",
          }}
        ></LinearProgress>
      </Paper>
    </>
  );
};

export default LoadingBar;
