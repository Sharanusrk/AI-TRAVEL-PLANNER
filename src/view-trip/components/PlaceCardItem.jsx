import React, { useEffect, useState } from 'react';
import Button from '../../Components/ui/Button';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

const PlaceCardItem = ({ place }) => {

 const [photoUrl,setPhotoUrl]=useState();
  const GetPlacePhoto = async () => {
    if (!place?.placeName) return; // ✅ Prevent empty request

    const data = {
      textQuery: place.placeName,
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
  }, [place]); // ✅ trip is enough


  return (
    <Link to={'https:www.google.com/maps/search/?api=1&query='+ place.placeName} target='_blank'>
    <div className="border p-3 rounded-xl mt-2 flex items-start gap-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="Place" className="w-[130px] h-[130px] rounded-xl object-cover" />
      
      <div className="flex-1">
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-600">{place.placeDetails}</p>
        <div className='flex items-center justify-between'>
        <h2 className="mt-2">⏰ {place.timeToSpend}</h2>

        <div className="mt-2 flex items-center">
          <Button> <FaMapLocationDot /> </Button>
        </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default PlaceCardItem;
