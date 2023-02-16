import { LinearProgress } from "@mui/material";
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
    <div className="fixed z-[999] pointer-events-none transition-all max-w-[1580px]">
      <div className="w-full">
        <LinearProgress value={level} color="primary" />
      </div>
    </div>
  );
};

export default LoadingBar;
