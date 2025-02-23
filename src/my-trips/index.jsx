import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseconfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigate = useNavigate(); // useNavigate must be inside the component
  const [userTrips,setUserTrips]=useState([])
  useEffect(() => {
    const GetUserTrips = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Fix: Parse user data

      if (!user) {
        navigate("/"); // Fix: useNavigate should be called inside the effect
        return;
      }

      try {
        setUserTrips([]);
        const q = query(
          collection(db, "AITrips"),
          where("userEmail", "==", user.email) // Use user.email after parsing
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    GetUserTrips();
  }, [navigate]); // Fix: Dependency array includes navigate

  return (
  <div className="sm:p-10 md:px-20 lg:px-36 xl:px-72 px-5 mt-10">
    <h2 className="font-bold text-3xl">My Trips</h2>

    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-5'>
        {userTrips?.length>0?userTrips.map((trip,index)=>(
            <UserTripCardItem trip={trip} />
        )):[1,2,3,4,5].map((item,index)=>(
            <div key={index} className="h-[220px] w-full bg-slate-200  rounded-xl animate-pulse" >

            </div>
        ))
    }
    </div>
  </div>)
};

export default MyTrips;
