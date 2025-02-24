import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Menu and Close Icons
import Button from "../ui/Button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SignInDialog from "../ui/SignInDialog";
import HButton from "../ui/hbutton";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdown, setDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    
  }, [user, dropdown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDropdown(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dropdown]);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (err) => console.log("Google Login Error:", err),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-1 shadow-sm flex justify-between items-center sticky top-0 bg-white z-20 h-25">
      {/* Left Side - Logo & Title */}
      <div className="flex items-center gap-2">
        <a href="/">
          <img
            src="logo1.png"
            alt="Logo"
            style={{ width: "10vh", height: "8vh" }}
            className="cursor-pointer md:h-50 w-50"
          />
        </a>
        <h1 className="text-center sm:text-left sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-purple-900 to-pink-600 animate-gradient-move bg-[200%] text-2xl">
          TravelGenie
        </h1>
      </div>

      {/* Middle - Desktop Buttons (Only Show When Logged In) */}
      {user && (
        <div className="hidden md:flex gap-3 flex-12 justify-end">
          <a href="/create-trip">
            <HButton variant="outline">
              <span className="text-md md:text-sm">+ </span> Create Trips
            </HButton>
          </a>
          <a href="/my-trips">
            <HButton className="rounded-full" variant="outline">
              My Trips
            </HButton>
          </a>
        </div>
      )}

      {/* Right Side - Profile & Menu Button */}
      <div className="flex items-center gap-2 md:flex-1 md:justify-end">
        {user ? (
          <div className="relative flex gap-2 items-center">
            {/* Profile Image */}
            <div className="relative" onMouseEnter={() => setDropdown(true)} onClick={() => setDropdown(!dropdown)}>
              <img
                src={user.picture}
                alt="User Profile"
                className="rounded-full w-12 h-12 cursor-pointer border border-gray-300"
              />

              {/* Dropdown Menu */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-red-600 hover:font-bold rounded-xl cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Menu Button (Only in Mobile) */}
            <button className="md:hidden p-2 text-gray-700" onClick={() => setIsSidebarOpen(true)}>
              <FiMenu size={28} />
            </button>
          </div>
        ) : (
          // Sign-in Button (For Not Logged-in Users)
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>

      {/* Sidebar Menu (Only Show When Logged In) */}
      {user && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-white" onClick={() => setIsSidebarOpen(false)}>
            <FiX size={28} />
          </button>

          <div className="mt-10 space-y-4 flex flex-col items-center">
            <a href="/create-trip">
              <HButton className="w-full " variant="outline">
                <div className="text-amber-50"> Create Trips </div>
              </HButton>
            </a>
            <a href="/my-trips">
              <HButton className="w-full" variant="outline">
                <div className="text-amber-50"> My Trips </div>
              </HButton>
            </a>
          </div>
        </div>
      )}

      {/* Sign-in Dialog */}
      <SignInDialog open={openDialog} onClose={() => setOpenDialog(false)} login={login} />
    </div>
  );
};

export default Header;
