import React, { useState } from "react";
import { Car, Bus } from "lucide-react";
import { FaCarSide, FaShuttleVan, FaWheelchair, FaTaxi } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

const vehicleIcons = {
  "Any Car": <FaCarSide size={24} />, // Generic car icon
  "Saloon Car": <FaCarSide size={24} />, // Regular car
  "Estate Car": <Car size={24} />, // Side car icon (better fit than warehouse)
  "MPV": <FaShuttleVan size={24} />, // Van-style car
  "Executive Car": <FaTaxi size={24} />, // Taxi icon to represent luxury cars
  "8 Seater Minibus": <Bus size={24} />, // Minibus icon
  "Wheelchair Accessible Cars": <FaWheelchair size={24} />, // Wheelchair car
};

const vehicles = [
  { id: 1, name: "Any Car", passengers: 4, luggage: 2, price: 84, eta: "11:41", description: "A standard car suitable for up to 4 passengers and 2 luggage." },
  { id: 2, name: "Saloon Car", passengers: 4, luggage: 2, price: 84, eta: "11:41", description: "Accommodates up to 4 passengers with space for 2 suitcases and 2 hand luggage items." },
  { id: 3, name: "Estate Car", passengers: 4, luggage: 4, price: 89, eta: "11:41", description: "Spacious estate car for extra luggage capacity." },
  { id: 4, name: "MPV", passengers: 6, luggage: 2, price: 95, eta: "11:41", description: "Multi-purpose vehicle with more seats and comfort." },
  { id: 5, name: "Executive Car", passengers: 4, luggage: 2, price: 129, eta: "11:41", description: "Premium car for executive travel." },
  { id: 6, name: "8 Seater Minibus", passengers: 8, luggage: 8, price: 130, eta: "11:41", description: "Perfect for large groups with lots of luggage." },
  { id: 7, name: "Wheelchair Accessible Cars", passengers: 5, luggage: 0, price: 132, eta: "11:41", description: "Car equipped for wheelchair access." },
];

const VehicleSelection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVehicle, setModalVehicle] = useState(null);
  const [extras, setExtras] = useState({
    meetAndGreet: false,
    waitAndReturn: false,
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="bg-white shadow-lg mx-auto p-6 pt-1 rounded-lg max-w-lg">
      <h2 className="mb-3 font-semibold text-lg">Choose your vehicle</h2>

      <button className="bg-blue-500 mb-3 px-4 py-2 rounded text-white">🔍 Filter</button>

       <div className="gap-4 grid grid-cols-3">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer text-center ${
            selectedVehicle === vehicle.id ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setSelectedVehicle(vehicle.id)}
        >
          {vehicleIcons[vehicle.name]}
          <p className="font-semibold text-sm">{vehicle.name}</p>
          <p className="text-xs">👤 {vehicle.passengers} | 🛄 {vehicle.luggage}</p>
          <p className="font-semibold text-xs">Fixed Price: £{vehicle.price}</p>
          <p className="text-xs">ETA: {vehicle.eta}</p>
          <button
            className="mt-2 text-gray-500"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click event
              setModalVehicle(vehicle);
            }}
          >
            <FaInfoCircle size={18} />
          </button>
        </div>
      ))}

      {/* Modal */}
      {modalVehicle && (
        <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
          <div className="bg-white shadow-lg mx-4 p-4 rounded-lg w-full max-w-sm">
            <h2 className="font-bold text-lg">{modalVehicle.name}</h2>
            <p className="mt-2 text-sm">{modalVehicle.description}</p>
            <button
              className="bg-blue-500 mt-4 px-4 py-1 rounded text-white"
              onClick={() => setModalVehicle(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>

      <h2 className="mt-5 font-semibold text-lg">Extras</h2>
      <div className="flex flex-col">
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            checked={extras.meetAndGreet}
            onChange={() => setExtras({ ...extras, meetAndGreet: !extras.meetAndGreet })}
            className="mr-2"
          />
          Meet and Greet
        </label>
        <label className="inline-flex items-center opacity-50 mt-2">
          <input type="checkbox" className="mr-2" /> Wait and Return
        </label>
      </div>

      <h2 className="mt-5 font-semibold text-lg">Choose your payment method:</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Pay by Cash
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Pay by Card
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="googlepay"
            checked={paymentMethod === "googlepay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          <span className="flex items-center">
            <img src="g-pay.png" alt="Google Pay" className="mr-1 h-4" /> Google Pay
          </span>
        </label>
      </div>

      <button className="bg-blue-500 mt-5 py-2 rounded-lg w-full font-semibold text-white text-lg">
        Book Now
      </button>
    </div>
  
  );
};

export default VehicleSelection;
