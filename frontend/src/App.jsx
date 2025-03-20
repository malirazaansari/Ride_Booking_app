// import React, { useState, useEffect } from "react";
// import TripDetailsForm from "./groups/TripDetailsForm";
// import VehicleSelection from "./groups/VehicleSelection";
// import GoogleMapComponent from "./components/GoogleMapComponent";
// import { LoadScript } from "@react-google-maps/api";

// const App = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [pickupPlace, setPickupPlace] = useState(null);
//   const [dropoffPlace, setDropoffPlace] = useState(null);
//   const [viaPlaces, setViaPlaces] = useState([]);
//   const [addViaPlace, setAddViaPlace] = useState(null);
//   const [isWaitAndReturnDisabled, setIsWaitAndReturnDisabled] = useState(true);
//   const [isWaitAndReturn, setIsWaitAndReturn] = useState(false);
//   const [distance, setDistance] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [showBookingSummaryModal, setShowBookingSummaryModal] = useState(false);
//   const [bookingSummary, setBookingSummary] = useState(null);
//   const [selectedDateTime, setSelectedDateTime] = useState(null); // Add state for date and time

//   const [tripDetails, setTripDetails] = useState({
//     name: "",
//     email: "",
//     phone: "", 
//     notes: "",
//   });

//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [extras, setExtras] = useState({
//     meetAndGreet: false,
//     waitAndReturn: false,
//   });

//   const handlePlaceSelected = (place, type, index = null) => {
//     if (type === "pickup") {
//       setPickupPlace(place);
//     } else if (type === "dropoff") {
//       setDropoffPlace(place);
//     } else if (type === "via") {
//       const updatedViaPlaces = [...viaPlaces];
//       if (index !== null) {
//         if (place === null) {
//           updatedViaPlaces.splice(index, 1); // Remove the via place if null
//         } else {
//           updatedViaPlaces[index] = place; // Update the via place
//         }
//       }
//       setViaPlaces(updatedViaPlaces); // Update the state
//     }
  
//     if (pickupPlace && dropoffPlace) {
//       setIsWaitAndReturnDisabled(false);
//     } else {
//       setIsWaitAndReturnDisabled(true);
//     }
//   };

//   useEffect(() => {
//     if (pickupPlace && dropoffPlace && viaPlaces.length === 0) {
//       setIsWaitAndReturnDisabled(false);
//     } else {
//       setIsWaitAndReturnDisabled(true);
//     }
//   }, [pickupPlace, dropoffPlace, viaPlaces]);

//   const handleWaitAndReturnConfirmed = () => {
//     if (pickupPlace && dropoffPlace) {
//       setViaPlaces([dropoffPlace]);
//       setAddViaPlace(dropoffPlace);
      
//       setDropoffPlace((prevDropoff) => {
//         console.log("Previous Dropoff:", prevDropoff);
//         console.log("Setting Dropoff to:", pickupPlace);
//         return pickupPlace;
//       });
  
//       setIsWaitAndReturn(true);
//     }
//   };

//   const calculateDistance = async () => {
//     if (pickupPlace && dropoffPlace) {
//       const service = new window.google.maps.DistanceMatrixService();
//       const waypoints = [pickupPlace, ...viaPlaces.filter((place) => place !== null), dropoffPlace]; // Filter out null values

//       let totalDistance = 0;

//       for (let i = 0; i < waypoints.length - 1; i++) {
//         service.getDistanceMatrix(
//           {
//             origins: [waypoints[i].formatted_address],
//             destinations: [waypoints[i + 1].formatted_address],
//             travelMode: "DRIVING",
//           },
//           (response, status) => {
//             if (status === "OK") {
//               const result = response.rows[0].elements[0];
//               if (result.status === "OK") {
//                 totalDistance += result.distance.value / 1000;
//                 setDistance(totalDistance);
//               } else {
//                 console.error("Error fetching distance:", result.status);
//               }
//             } else {
//               console.error("Error calculating distance:", status);
//             }
//           }
//         );
//       }
//     } else {
//       setDistance(0); 
//     }
//   };

//   useEffect(() => {
//     calculateDistance();
//   }, [pickupPlace, dropoffPlace,viaPlaces]);

//   const handleBooking = () => {
//     if (!pickupPlace || !dropoffPlace || !tripDetails.name || !tripDetails.email || !tripDetails.phone || !selectedVehicle || !paymentMethod || !selectedDateTime) {
//       alert("Please fill out all required fields, including date and time, before booking.");
//       return;
//     }
//     const bookingData = {
//       pickupPlace,
//       dropoffPlace,
//       viaPlaces,
//       isWaitAndReturn,
//       distance,
//       tripDetails, 
//       selectedVehicle, // This now contains the full vehicle object
//       extras,
//       paymentMethod,
//       selectedDateTime, // Include date and time in booking data
//     };
//     setBookingSummary(bookingData);
//     setShowBookingSummaryModal(true);
//   };

//   const handleBookingConfirmation = () => {
//     setShowBookingSummaryModal(false);
//     setPickupPlace(null);
//     setDropoffPlace(null);
//     setViaPlaces([]);
//     setAddViaPlace(null);
//     setIsWaitAndReturn(false);
//     setDistance(0);
//     setTripDetails({ name: "", email: "", phone: "", notes: "" });
//     setSelectedVehicle(null);
//     setExtras({ meetAndGreet: false, waitAndReturn: false });
//     setPaymentMethod(null);
//     setSelectedDateTime(null); // Reset date and time
//   };

// return (
//   <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
//     <div className="relative flex h-screen">
//       <div className={`bg-gray-100 p-4 transition-all duration-300 ${isVisible ? "w-1/2 lg:w-1/2" : "w-full"} md:w-full overflow-y-auto`}>
//         <TripDetailsForm
//           onPlaceSelected={handlePlaceSelected}
//           addViaPlace={addViaPlace}
//           isWaitAndReturn={isWaitAndReturn}
//           pickupPlace={pickupPlace} 
//           dropoffPlace={dropoffPlace}
//           viaPlaces={viaPlaces}
//           onTripDetailsChange={setTripDetails} 
//           onDateTimeChange={setSelectedDateTime} // Pass handler for date and time
//         />
//         <VehicleSelection
//           onWaitAndReturnConfirmed={handleWaitAndReturnConfirmed}
//           isWaitAndReturnDisabled={isWaitAndReturnDisabled}
//           distance={distance}
//           onBookNow={handleBooking}
//           onVehicleSelect={setSelectedVehicle} 
//           onExtrasChange={setExtras}
//           onPaymentMethodChange={setPaymentMethod}
//           selectedDateTime={selectedDateTime} // Pass selected date and time
//         />
//       </div>

//       <button
//         onClick={() => setIsVisible(!isVisible)}
//         className="hidden lg:block top-2 right-15 z-50 fixed bg-blue-500 shadow-md px-3 py-2 rounded-md text-white"
//       >
//         {isVisible ? "Hide Map" : "Show Map"}
//       </button>

//       <div className="hidden lg:block">
//         <GoogleMapComponent isVisible={isVisible} pickupPlace={pickupPlace} dropoffPlace={dropoffPlace} viaPlaces={viaPlaces} isWaitAndReturn={isWaitAndReturn} />
//       </div>

//       {showBookingSummaryModal && (
//         <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
//           <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
//             <h2 className="font-bold text-lg">Booking Summary</h2>
//             <p className="mt-2 text-sm">
//               <strong>Pickup Place:</strong> {bookingSummary.pickupPlace?.formatted_address || "N/A"} <br />
//               <strong>Dropoff Place:</strong> {bookingSummary.dropoffPlace?.formatted_address || "N/A"} <br />
//               <strong>Via Places:</strong> {bookingSummary.viaPlaces.map((place, idx) => (
//                 <span key={idx}>{place.formatted_address}{idx < bookingSummary.viaPlaces.length - 1 ? ", " : ""}</span>
//               )) || "None"} <br />
//               <strong>Distance:</strong> {bookingSummary.distance.toFixed(2)} km <br />
//               <strong>Name:</strong> {bookingSummary.tripDetails.name} <br />
//               <strong>Email:</strong> {bookingSummary.tripDetails.email} <br />
//               <strong>Phone:</strong> {bookingSummary.tripDetails.phone} <br />
//               <strong>Notes:</strong> {bookingSummary.tripDetails.notes || "None"} <br />
//               <strong>Selected Vehicle:</strong> {bookingSummary.selectedVehicle?.name || "N/A"} <br />
//               <strong>Extras:</strong> {bookingSummary.extras.meetAndGreet ? "Meet and Greet" : "None"} {bookingSummary.extras.waitAndReturn ? ", Wait and Return" : ""} <br />
//               <strong>Payment Method:</strong> {bookingSummary.paymentMethod} <br />
//               <strong>Date and Time:</strong> {bookingSummary.selectedDateTime || "N/A"} <br />
//             </p>
//             <button
//               className="bg-blue-500 hover:bg-blue-600 mt-4 px-6 py-2 rounded text-white"
//               onClick={handleBookingConfirmation}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   </LoadScript>
// );
// };

// export default App;



import React, { useState, useEffect } from "react";
import TripDetailsForm from "./groups/TripDetailsForm";
import VehicleSelection from "./groups/VehicleSelection";
import GoogleMapComponent from "./components/GoogleMapComponent";
import { LoadScript } from "@react-google-maps/api";
import BookingSummaryModal from "./components/BookingSummaryModal";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [pickupPlace, setPickupPlace] = useState(null);
  const [dropoffPlace, setDropoffPlace] = useState(null);
  const [viaPlaces, setViaPlaces] = useState([]);
  const [addViaPlace, setAddViaPlace] = useState(null);
  const [isWaitAndReturnDisabled, setIsWaitAndReturnDisabled] = useState(true);
  const [isWaitAndReturn, setIsWaitAndReturn] = useState(false);
  const [distance, setDistance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showBookingSummaryModal, setShowBookingSummaryModal] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null); // Add state for date and time

  const [tripDetails, setTripDetails] = useState({
    name: "",
    email: "",
    phone: "", 
    notes: "",
  });

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [extras, setExtras] = useState({
    meetAndGreet: false,
    waitAndReturn: false,
  });

  const handlePlaceSelected = (place, type, index = null) => {
    if (type === "pickup") {
      setPickupPlace(place);
    } else if (type === "dropoff") {
      setDropoffPlace(place);
    } else if (type === "via") {
      const updatedViaPlaces = [...viaPlaces];
      if (index !== null) {
        if (place === null) {
          updatedViaPlaces.splice(index, 1); // Remove the via place if null
        } else {
          updatedViaPlaces[index] = place; // Update the via place
        }
      }
      setViaPlaces(updatedViaPlaces); // Update the state
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
      const waypoints = [pickupPlace, ...viaPlaces.filter((place) => place !== null), dropoffPlace]; // Filter out null values

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
    } else {
      setDistance(0); 
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [pickupPlace, dropoffPlace,viaPlaces]);

  const handleBooking = () => {
    if (!pickupPlace || !dropoffPlace || !tripDetails.name || !tripDetails.email || !tripDetails.phone || !selectedVehicle || !paymentMethod || !selectedDateTime) {
      alert("Please fill out all required fields, including date and time, before booking.");
      return;
    }
    const bookingData = {
      pickupPlace,
      dropoffPlace,
      viaPlaces,
      isWaitAndReturn,
      distance,
      tripDetails, 
      selectedVehicle, // This now contains the full vehicle object
      extras,
      paymentMethod,
      selectedDateTime, // Include date and time in booking data
    };
    setBookingSummary(bookingData);
    setShowBookingSummaryModal(true);
  };

  const handleBookingConfirmation = () => {
    setShowBookingSummaryModal(false);
    setPickupPlace(null);
    setDropoffPlace(null);
    setViaPlaces([]);
    setAddViaPlace(null);
    setIsWaitAndReturn(false);
    setDistance(0);
    setTripDetails({ name: "", email: "", phone: "", notes: "" });
    setSelectedVehicle(null);
    setExtras({ meetAndGreet: false, waitAndReturn: false });
    setPaymentMethod(null);
    setSelectedDateTime(null); // Reset date and time
  };

return (
  <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
    <div className="relative flex h-screen">
      <div className={`bg-gray-100 p-4 transition-all duration-300 ${isVisible ? "w-1/2 lg:w-1/2" : "w-full"} md:w-full overflow-y-auto`}>
        <TripDetailsForm
          onPlaceSelected={handlePlaceSelected}
          addViaPlace={addViaPlace}
          isWaitAndReturn={isWaitAndReturn}
          pickupPlace={pickupPlace} 
          dropoffPlace={dropoffPlace}
          viaPlaces={viaPlaces}
          onTripDetailsChange={setTripDetails} 
          onDateTimeChange={setSelectedDateTime} // Pass handler for date and time
        />
        <VehicleSelection
          onWaitAndReturnConfirmed={handleWaitAndReturnConfirmed}
          isWaitAndReturnDisabled={isWaitAndReturnDisabled}
          distance={distance}
          onBookNow={handleBooking}
          onVehicleSelect={setSelectedVehicle} 
          onExtrasChange={setExtras}
          onPaymentMethodChange={setPaymentMethod}
          selectedDateTime={selectedDateTime} // Pass selected date and time
        />
      </div>

      <button
        onClick={() => setIsVisible(!isVisible)}
        className="hidden lg:block top-2 right-15 z-50 fixed bg-blue-500 shadow-md px-3 py-2 rounded-md text-white"
      >
        {isVisible ? "Hide Map" : "Show Map"}
      </button>

      <div className="hidden lg:block">
        <GoogleMapComponent isVisible={isVisible} pickupPlace={pickupPlace} dropoffPlace={dropoffPlace} viaPlaces={viaPlaces} isWaitAndReturn={isWaitAndReturn} />
      </div>

      {showBookingSummaryModal && (
        <BookingSummaryModal
          bookingSummary={bookingSummary}
          onClose={handleBookingConfirmation}
        />
      )}
    </div>
  </LoadScript>
);
};

export default App;
