import React from "react";

const Button = ({ children, onClick, disabled = false, className = "" }) => {
  return (
    <button
      className={`p-4 m-2 bg-black text-white rounded-lg font-bold cursor-pointer hover:bg-gray-900 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
