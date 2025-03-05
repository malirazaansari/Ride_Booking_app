import React, { useState } from "react";
import TripDetailsForm from "./groups/TripDetailsForm";
import VehicleSelection from "./groups/VehicleSelection";
import GoogleMapComponent from "./components/GoogleMapComponent";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative flex h-screen">
      {/* Left Section - Forms */}
      <div className={`bg-gray-100 p-4 transition-all duration-300 ${isVisible ? "w-1/2" : "w-full"} overflow-y-auto`}>
        <TripDetailsForm />
        <VehicleSelection />
      </div>

      {/* Toggle Button (Always Visible) */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="top-2 right-15 z-50 fixed bg-blue-500 shadow-md px-3 py-2 rounded-md text-white"
      >
        {isVisible ? "Hide Map" : "Show Map"}
      </button>

      {/* Right Section - Google Map (Visible/Hidden via CSS) */}
      <GoogleMapComponent isVisible={isVisible} />
    </div>
  );
};

export default App;
