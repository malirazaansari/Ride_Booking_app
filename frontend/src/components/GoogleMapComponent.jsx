import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const defaultCenter = {
  lat: 51.509865,
  lng: -0.118092,
};

const GoogleMapComponent = ({ isVisible }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className={`fixed top-0 right-0 h-screen w-1/2 bg-white shadow-lg transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"}`}>
      <LoadScript googleMapsApiKey={apiKey}>
        <div className="w-full h-full">
          <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={defaultCenter} zoom={10} />
        </div>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
