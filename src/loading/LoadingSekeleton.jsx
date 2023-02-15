import React from "react";

const LoadingSekeleton = (props) => {
  return (
    <div
      className={`skeleton ${props.className}`}
      style={{
        height: props.height,
        width: props.width || "100%",
        borderRadius: props.borderRadius,
      }}
    ></div>
  );
};

export default LoadingSekeleton;
