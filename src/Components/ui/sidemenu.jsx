import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for open/close

const Sidebar = ({ buttons }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Button (Visible on Mobile) */}
      <button
        className="p-2 text-white bg-blue-600 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="text-white absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} />
        </button>
        <div className="mt-10 space-y-4">{buttons}</div>
      </div>
    </>
  );
};

export default Sidebar;
