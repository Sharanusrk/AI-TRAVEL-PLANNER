import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseconfig";
import Toast from "../../Components/ui/Toast";
import InformationSection from "../components/InformationSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const [trip, setTrip] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const { tripId } = useParams();

  useEffect(() => {
    if (tripId) {
      console.log("Fetching trip data for ID:", tripId);
      GetTripDta();
    }
  }, [tripId]);

  const GetTripDta = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId); // ✅ Fixed collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
       
        setTrip(docSnap.data());
      } else {
        console.error("❌ No such document found!");
        setToastVisible(true);
      }
    } catch (error) {
      console.error("🔥 Error fetching document:", error);
      setToastVisible(true);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      

      

      {toastVisible && (
        <Toast
          message="Document not found"
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      )}


      <div>
        {/* Information Section */}
         <InformationSection trip={trip} />
        {/* Recomended Hotels */}
             <Hotels trip={trip}/>
        {/* Daily Plan  */}
               <PlacesToVisit trip={trip}/>
        {/* Footer  */}
        <Footer trip={trip}/>

      </div>
    </div>
  );
};

export default Viewtrip;
