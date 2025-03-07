import React, { useState } from "react";
import TripDetailsForm from "./groups/TripDetailsForm";
import VehicleSelection from "./groups/VehicleSelection";
import GoogleMapComponent from "./components/GoogleMapComponent";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative flex h-screen">
      <div className={`bg-gray-100 p-4 transition-all duration-300 ${isVisible ? "w-1/2" : "w-full"} overflow-y-auto`}>
        <TripDetailsForm />
        <VehicleSelection />
      </div>

      <button
        onClick={() => setIsVisible(!isVisible)}
        className="top-2 right-15 z-50 fixed bg-blue-500 shadow-md px-3 py-2 rounded-md text-white"
      >
        {isVisible ? "Hide Map" : "Show Map"}
      </button>

      <GoogleMapComponent isVisible={isVisible} />
    </div>
  );
};

export default App;
