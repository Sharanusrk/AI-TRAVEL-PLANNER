import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center mx-56 gap-4 flex-col">
      <h1 className=" font-extrabold sm:text-[55px] text-center mt-16 mb-4 text-[35px]">
       <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Discover Your Next Adventure with AI:</span>
       <br /> Personalized Itineraries at Your
        Fingertips
      </h1>
    <br />
      <p className="sm:text-2xl text-gray-500 text-center text-xl ">Your Personal trip planner and travel curator, creating custom Itineraries tailored to your interests and budget</p>
       
      <Link to={'/create-trip'}>
      <Button className="text-sm mt-5"> Get Started</Button></Link>

      <img 
  src="image.png" 
  className="hidden sm:block sm:mt-35 sm:scale-180 sm:w-[75vh] sm:h-[50vh] mt-19 scale-100 w-[45vh] h-[45vh] " 
  alt="" 
/>

    </div>


  );
};

export default Hero;
