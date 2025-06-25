import React from "react";

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black/20"
    />
  );
};
