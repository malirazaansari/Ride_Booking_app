import React from "react";
import TripDetailsForm from "./groups/TripDetailsForm";
import VehicleSelection from "./groups/VehicleSelection";
import GoogleMapComponent from "./components/GoogleMapComponent";

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-100 p-4 w-1/2 overflow-y-auto">
        <TripDetailsForm />
        <VehicleSelection />
      </div>

      <div className="w-1/2">
        <GoogleMapComponent />
      </div>
    </div>
  );
};

export default App;
