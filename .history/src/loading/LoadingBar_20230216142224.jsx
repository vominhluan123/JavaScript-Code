import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const LoadingBar = () => {
  const [level, setLever] = useState(0);
  useEffect(() => {}, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color="#f62682" />
    </div>
  );
};

export default LoadingBar;
