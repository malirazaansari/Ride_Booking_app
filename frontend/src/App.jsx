import React, { useState } from "react";
import TripDetailsForm from "./groups/TripDetailsForm";
import VehicleSelection from "./groups/VehicleSelection";
import GoogleMapComponent from "./components/GoogleMapComponent";
import { LoadScript } from "@react-google-maps/api";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [pickupPlace, setPickupPlace] = useState(null);
  const [dropoffPlace, setDropoffPlace] = useState(null);
  const [viaPlaces, setViaPlaces] = useState([]);

  const handlePlaceSelected = (place, type, index = null) => {
    if (type === "pickup") {
      setPickupPlace(place);
    } else if (type === "dropoff") {
      setDropoffPlace(place);
    } else if (type === "via") {
      const updatedViaPlaces = [...viaPlaces];
      if (index !== null) {
        updatedViaPlaces[index] = place;
      }
      setViaPlaces(updatedViaPlaces);
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="relative flex h-screen">
        <div className={`bg-gray-100 p-4 transition-all duration-300 ${isVisible ? "w-1/2" : "w-full"} overflow-y-auto`}>
          <TripDetailsForm onPlaceSelected={handlePlaceSelected} />
          <VehicleSelection />
        </div>

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="top-2 right-15 z-50 fixed bg-blue-500 shadow-md px-3 py-2 rounded-md text-white"
        >
          {isVisible ? "Hide Map" : "Show Map"}
        </button>

        <GoogleMapComponent isVisible={isVisible} pickupPlace={pickupPlace} dropoffPlace={dropoffPlace} viaPlaces={viaPlaces} />
      </div>
    </LoadScript>
  );
};

export default App;
