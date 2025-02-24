import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Input from "../Components/ui/Input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import Button from "../Components/ui/Button";
import Toast from "../Components/ui/Toast";
import { chatSession } from "../service/aimoddel";
import SignInDialog from "../Components/ui/SignInDialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../service/firebaseconfig";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, useNavigation } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // For Sign-In Dialog
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()
  // Handle input changes
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      alert("Please Enter Days On a Scale of FIVE 🫤");
      setFormData((prevState) => ({
        ...prevState,
        [name]: 5,
      }));
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Generate trip plan
  const Generatetrip = async () => {
   
    let user = localStorage.getItem("user");

   
    
     

// Add a new document in collection "cities"

  
    // If user exists but is not JSON, wrap it in an object
    try {
      user = JSON.parse(user);
    } catch (e) {
      console.warn("User data is not valid JSON. Wrapping it properly.");
      user = { email: user }; // Assume only email is stored
    }
  
 
  
    if (!user || !user.email) {
      console.log("User not found. Opening sign-in dialog.");
      setOpenDialog(true);
      return;
    }
  
    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.noOfPeople) {
      console.log("Missing form fields. Showing toast.");
      setShowToast(true);
      return;
    }
    setLoading(true)
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location?.label)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{noOfPeople}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget);
  
   
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", await result.response.text());
      setLoading(false)
      SaveAiTrip(await result.response.text());
    } catch (error) {
      console.error("Error in generating trip:", error);
    }
  };
  
  
  const SaveAiTrip= async(TripData)=>{
    setLoading(true)
    const docId=Date.now().toString()
    const user=JSON.parse(localStorage.getItem('user'))
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      
      userEmail:user?.email,
      id:docId
    })
  setLoading(false)
   navigate('/view-trip/'+docId)}

  // Handle toast close
  const handleToastClose = () => {
    setShowToast(false);
  };

  // Google Login
    const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (err) => console.log("Google Login Error:", err),
  });

  // Fetch user profile from Google
const GetUserProfile = (tokenInfo) => {
   

    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
       
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        Generatetrip(); // Call function after login
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      {/* Toast Notification */}
      <Toast message="Please Fill All Details" visible={showToast} onClose={handleToastClose} />

      <h2 className="font-bold text-3xl">Let us Know Your Travel Preferences 🏕️ 🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-15">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        {/* Number of Days */}
        <div className="mt-15 flex flex-col gap-9">
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input onChange={(value) => handleInputChange("noOfDays", value)} />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-2xl my-3 font-medium mt-15">What is Your Budget?</h2>
          <h2 className="text-xl my-1 font-medium">
            The Budget is exclusively allocated for activities and dining purposes.
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                onClick={() => handleInputChange("budget", item.title)}
                key={index}
                className={`hover:shadow-xl p-5 border border-gray-200 rounded-lg cursor-pointer ${
                  formData?.budget === item.title ? "border-3 border-gray-950" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions Selection */}
        <div>
          <h2 className="text-xl my-1 font-medium">Who do you plan on traveling with?</h2>
          <div className="grid sm:grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                onClick={() => handleInputChange("noOfPeople", item.people)}
                key={index}
                className={`hover:shadow-xl p-5 border-gray-200 border rounded-lg cursor-pointer ${
                  formData?.noOfPeople === item.people ? "border-3 border-gray-950" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end">
        {/* Sign-In Dialog */}
        <SignInDialog open={openDialog} onClose={() => setOpenDialog(false)   }  login={login} />
        
        {/* Generate Trip Button */}
        <Button onClick={Generatetrip} disabled={loading} >
          {loading?<ImSpinner2 className="h-7 w-7 animate-spin" />:"Generate-trip"}</Button>
      </div>

      {/* Debug Test Button */}
    
    </div>
  );
};

export default CreateTrip;


