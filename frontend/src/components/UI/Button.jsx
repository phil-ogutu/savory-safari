import React from "react";

export const Button = ({
  content,
  className = "",
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`p-3 mx-3 font-bold text-white border border-platinum bg-light-orange hover:bg-orange hover:text-rich-black rounded-lg ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
