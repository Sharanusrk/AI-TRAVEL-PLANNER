import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

const HotelCardItem = ({hotel ,index}) => {
     const [photoUrl,setPhotoUrl]=useState();
      const GetPlacePhoto = async () => {
        if (!hotel?.hotelName) return; // ✅ Prevent empty request
    
        const data = {
          textQuery: hotel?.hotelName,
        };
    
        try {
          const result = await GetPlaceDetails(data);
          
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[1].name)
          setPhotoUrl(PhotoUrl)
          
        } catch (error) {
          console.error("Error fetching place details:", error.response?.data || error.message);
        }
      };
        useEffect(() => {
          GetPlacePhoto();
        }, [hotel]); 
  return (
     <Link
          key={hotel?.id || index}  // ✅ Adding a unique key
          to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} 
          target='_blank'
        >
          <div className='hover:scale-110 transition-all cursor-pointer  bg-gray-200 rounded-lg'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-lg h-[180px] w-full object-c' /> 
            <div className='my-2 flex flex-col gap-2'>
              <h2 className='font-medium text-center sm:text-left p-0.5 '>{hotel?.hotelName}</h2>
              <h2 className='text-xs text-gray-500 p-1 '>📍{hotel?.hotelAddress}</h2>
              <h2 className='text-sm p-1'>💸 {hotel?.price}</h2>
              <h2 className='text-sm p-1'>⭐ {hotel?.rating}</h2>
            </div>
          </div>
        </Link>
  )
}

export default HotelCardItem
