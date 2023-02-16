import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const LoadingBar = () => {
  const [level, setLever] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLever((newLever) => (newLever >= 100 ? 0 : newLever + 10));
    }, 1000);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color="#f62682" />
    </div>
  );
};

export default LoadingBar;
