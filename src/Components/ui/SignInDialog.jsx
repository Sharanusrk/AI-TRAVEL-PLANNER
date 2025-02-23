import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button"; // Adjust path based on your project

const SignInDialog = ({ open, onClose, login  }) => {
  if (!open) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/85 z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex items-center flex-col relative">
        
        {/* Close Button */}
        <button 
          className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-red-500 cursor-pointer" 
          onClick={onClose}
        >
          <RxCross1 />
        </button>

        {/* Logo */}
        <img src="logo1.png" alt="Logo" style={{ width: "10vh", height: "10vh" }} />

        {/* Title */}
        <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>

        {/* Description */}
        <pre className="text-center text-sm text-gray-600 mt-2">
          Sign in to the App with {"\n"} Google Authentication securely
        </pre>

        {/* Google Sign-in Button */}
        <Button className="w-full mt-5" onClick={login} >
<FcGoogle className="inline mr-2 mb-0.5 text-3xl" /> Sign In with Google
        
        </Button>
      </div>
    </div>
  );
};

export default SignInDialog;
