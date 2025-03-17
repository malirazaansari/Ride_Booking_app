import React, { useState, useEffect } from "react";
import TripDetailsForm from "./groups/TripDetailsForm";
import VehicleSelection from "./groups/VehicleSelection";
import GoogleMapComponent from "./components/GoogleMapComponent";
import { LoadScript } from "@react-google-maps/api";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [pickupPlace, setPickupPlace] = useState(null);
  const [dropoffPlace, setDropoffPlace] = useState(null);
  const [viaPlaces, setViaPlaces] = useState([]);
  const [addViaPlace, setAddViaPlace] = useState(null);
  const [isWaitAndReturnDisabled, setIsWaitAndReturnDisabled] = useState(true);
  const [isWaitAndReturn, setIsWaitAndReturn] = useState(false);
  const [distance, setDistance] = useState(0);

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

    if (pickupPlace && dropoffPlace) {
      setIsWaitAndReturnDisabled(false);
    } else {
      setIsWaitAndReturnDisabled(true);
    }
  };

  useEffect(() => {
    if (pickupPlace && dropoffPlace && viaPlaces.length === 0) {
      setIsWaitAndReturnDisabled(false);
    } else {
      setIsWaitAndReturnDisabled(true);
    }
  }, [pickupPlace, dropoffPlace, viaPlaces]);

  const handleWaitAndReturnConfirmed = () => {
    if (pickupPlace && dropoffPlace) {
      setViaPlaces([dropoffPlace]);
      setAddViaPlace(dropoffPlace);
      
      setDropoffPlace((prevDropoff) => {
        console.log("Previous Dropoff:", prevDropoff);
        console.log("Setting Dropoff to:", pickupPlace);
        return pickupPlace;
      });
  
      setIsWaitAndReturn(true);
    }
  };

  const calculateDistance = async () => {
    if (pickupPlace && dropoffPlace) {
      const service = new window.google.maps.DistanceMatrixService();
      
      // Build waypoints (including pickup, via places, and drop-off)
      const waypoints = [pickupPlace, ...viaPlaces, dropoffPlace];
  
      let totalDistance = 0;
  
      for (let i = 0; i < waypoints.length - 1; i++) {
        service.getDistanceMatrix(
          {
            origins: [waypoints[i].formatted_address],
            destinations: [waypoints[i + 1].formatted_address],
            travelMode: "DRIVING",
          },
          (response, status) => {
            if (status === "OK") {
              const result = response.rows[0].elements[0];
              if (result.status === "OK") {
                totalDistance += result.distance.value / 1000;
                setDistance(totalDistance);
              } else {
                console.error("Error fetching distance:", result.status);
              }
            } else {
              console.error("Error calculating distance:", status);
            }
          }
        );
      }
    }
  };
  

  useEffect(() => {
    calculateDistance();
  }, [pickupPlace, dropoffPlace,viaPlaces]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="relative flex h-screen">
        <div className={`bg-gray-100 p-4 transition-all duration-300 ${isVisible ? "w-1/2" : "w-full"} overflow-y-auto`}>
          <TripDetailsForm
            onPlaceSelected={handlePlaceSelected}
            addViaPlace={addViaPlace}
            isWaitAndReturn={isWaitAndReturn}
            pickupPlace={pickupPlace} 
            dropoffPlace={dropoffPlace}
            viaPlaces={viaPlaces}
          />
          <VehicleSelection
            onWaitAndReturnConfirmed={handleWaitAndReturnConfirmed}
            isWaitAndReturnDisabled={isWaitAndReturnDisabled}
            distance={distance} // Pass distance to VehicleSelection
          />
        </div>

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="top-2 right-15 z-50 fixed bg-blue-500 shadow-md px-3 py-2 rounded-md text-white"
        >
          {isVisible ? "Hide Map" : "Show Map"}
        </button>

        <GoogleMapComponent isVisible={isVisible} pickupPlace={pickupPlace} dropoffPlace={dropoffPlace} viaPlaces={viaPlaces} isWaitAndReturn={isWaitAndReturn} />
      </div>
    </LoadScript>
  );
};

export default App;
