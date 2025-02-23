import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Places to Visit</h2>

      <div className="space-y-6 mt-5">
        {trip?.tripData?.itinerary &&
          Object.keys(trip.tripData.itinerary).map((dayKey, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow">
              {/* Show "Day 1", "Day 2", etc. without the theme */}
              <h3 className="font-semibold text-lg mb-3">Day {index + 1}</h3>

              {/* Loop through morning, afternoon, evening, dinner */}
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(trip.tripData.itinerary[dayKey])
                  .filter(([timeOfDay]) => timeOfDay !== "theme") // Remove theme
                  .map(([timeOfDay, place], placeIndex) => (
                    <div key={placeIndex} className="space-y-2">
                      <h4 className="font-medium text-sm text-orange-600">{timeOfDay.toUpperCase()}</h4>
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
