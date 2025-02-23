import React from "react";

const HButton = ({ children, onClick, disabled = false}) => {
  return (
    <button
      className={`p-2  rounded-full border-2 border-gray-500 text-gray-700 cursor-pointer font-bold hover:text-amber-50 hover:bg-black text-sm sm:text-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default HButton;
