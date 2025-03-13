import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const defaultCenter = {
  lat: 51.509865,
  lng: -0.118092,
};

const GoogleMapComponent = ({ isVisible, pickupPlace, dropoffPlace, viaPlaces, isWaitAndReturn }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (pickupPlace && dropoffPlace) {
      const waypoints = viaPlaces.map((place) => ({
        location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
        stopover: true,
      }));

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickupPlace.geometry.location.lat(), lng: pickupPlace.geometry.location.lng() },
          destination: isWaitAndReturn ? { lat: pickupPlace.geometry.location.lat(), lng: pickupPlace.geometry.location.lng() } : { lat: dropoffPlace.geometry.location.lat(), lng: dropoffPlace.geometry.location.lng() },
          waypoints: isWaitAndReturn ? [{ location: { lat: dropoffPlace.geometry.location.lat(), lng: dropoffPlace.geometry.location.lng() }, stopover: true }, ...waypoints] : waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [pickupPlace, dropoffPlace, viaPlaces, isWaitAndReturn]);

  return (
    <div className={`fixed top-0 right-0 h-screen w-1/2 bg-white shadow-lg transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"}`}>
      <div className="w-full h-full">
        <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={defaultCenter} zoom={10}>
          {pickupPlace && <Marker position={{ lat: pickupPlace.geometry.location.lat(), lng: pickupPlace.geometry.location.lng() }} />}
          {viaPlaces.map((place, index) => (
            <Marker key={index} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
          ))}
          {dropoffPlace && <Marker position={{ lat: dropoffPlace.geometry.location.lat(), lng: dropoffPlace.geometry.location.lng() }} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
