import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {

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
    }, [trip]); 
  return (
    <Link to={'/view-trip/'+trip.id}>
    <div  className='hover:scale-105 transform-all hover:shadow-md rounded-2xl hover:border'>
      <img src={photoUrl} alt="" srcset="" className='object-cover rounded-xl p-2 '/>
      <h2 className='font-bold text-xl text-center'>{trip?.userSelection?.location?.label}</h2>
      <h2 className='text-sm text-gray-600 text-center'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
    </div>
    </Link>
  )
}

export default UserTripCardItem
