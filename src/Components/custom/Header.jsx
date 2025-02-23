import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SignInDialog from "../ui/SignInDialog";
import HButton from "../ui/hbutton";
 // Import the SignInDialog component

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdown, setDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  useEffect(() => {
    console.log(user);
  }, [user, dropdown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDropdown(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup to prevent memory leaks
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
      <div className="flex items-center gap-2">
        <a href="/"><img src="logo1.png" alt="Logo" style={{ width: "10vh", height: "8vh" }}  className="cursor-pointer md:h-50 w-50"/></a>
      <h1 className=" sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-purple-900 to-pink-600 animate-gradient-move bg-[200%] text-2xl">TravelGenie</h1>
      </div>
       
      <div>
        <div className="my-5 flex justify-end">
          {user ? (
            <div className="relative flex gap-2 items-center">
               <a href="/create-trip"> <HButton  variant="outline" >
                <span className="text-md md:text-sm">+ </span> Create Trips
              </HButton></a>
             <a href="/my-trips"> <HButton className="rounded-full" variant="outline">
                My Trips
              </HButton></a>

              {/* Profile Image with Hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdown(true)}
                onClick={() => setDropdown(!dropdown)}
              >
                <img
                  src={user.picture}
                  alt="User Profile"
                  className="rounded-full w-12 h-12 cursor-pointer border border-gray-300"
                />
                

                {/* Dropdown Menu */}
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg p-2 overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 ml-3 hover:font-bold rounded-xl cursor-pointer "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign in</Button> // Fix: Use arrow function
          )}
        </div>
      </div>

      {/* Sign-in Dialog */}
      <SignInDialog open={openDialog} onClose={() => setOpenDialog(false)} login={login} />
    </div>
  );
};

export default Header;
