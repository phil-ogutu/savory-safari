import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition ${className}`}
    >
      {children}
    </button>
  );
};
