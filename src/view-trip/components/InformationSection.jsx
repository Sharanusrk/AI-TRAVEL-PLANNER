import React, { useEffect, useState } from "react";
import Button from "../../Components/ui/Button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

const InformationSection = ({ trip }) => {

   

   const [photoUrl,setPhotoUrl]=useState();
  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location?.label) return; // ✅ Prevent empty request

    const data = {
      textQuery: trip.userSelection.location.label,
    };

    try {
      const result = await GetPlaceDetails(data);
     
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl)
    } catch (error) {
      console.error("Error fetching place details:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    GetPlacePhoto();
  }, [trip]); // ✅ trip is enough


 
  return (
    <div>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className="h-[340px] w-full object-cover rounded" />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Travelers: {trip?.userSelection?.noOfPeople}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 Budget {trip?.userSelection?.budget}
            </h2>
          </div>
        </div>
        <div>
          <Button className="text-sm mt-10 md:text-xl">
            <IoIosSend />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
