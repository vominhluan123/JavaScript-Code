import React from "react";

const Button = ({
  onClick,
  className,
  type = "button",
  bgColor = "primary",
  children,
  full = false,
}) => {
  let bgClassName = "bg-pink";
  switch (bgColor) {
    case "pink":
      bgClassName = "bg-pink";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} py-3 px-6 rounded-lg mt-auto capitalize ${bgClassName} ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
