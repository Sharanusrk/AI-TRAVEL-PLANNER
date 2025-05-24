import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { FiLink } from "react-icons/fi"; // Icon import

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/new-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="font-extrabold sm:text-[55px] text-[35px]">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Discover Your Next Adventure with AI
          </span>
          <br /> Personalized Itineraries at Your Fingertips
        </h1>
        <p className="sm:text-2xl text-gray-200 mt-4">
          Your personal trip planner and travel curator
        </p>

        <Link to={"/create-trip"}>
          <Button className="text-sm mt-5">Get Started</Button>
        </Link>

        {/* Linktree Button */}
        <a
          href="https://linktr.ee/Srk_sharan"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700 transition"
        >
          <FiLink />
          Visit My Profiles
        </a>

        {/* Optional foreground image */}
        {/* <img src="image.png" alt="" className="hidden sm:block mt-5 w-[45vh]" /> */}
      </div>
    </div>
  );
};

export default Hero;
