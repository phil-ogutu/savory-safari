import React from "react";

const Spinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <svg
      className="animate-spin h-10 w-10 text-orange-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="#fb923c"
        strokeWidth="2.5"
      ></circle>
      <path
        className="opacity-75"
        fill="#fb923c"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

export default Spinner;
