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
    <div className="flex items-center justify-center min-h-screen">
      <LinearProgress value={level} color="primary" className="w-full" />
    </div>
  );
};

export default LoadingBar;
