import React, { useState } from "react";

const vehicles = [
  { id: 1, name: "Any Car", passengers: 4, luggage: 2, img: "any-car.png" },
  { id: 2, name: "Saloon Car", passengers: 4, luggage: 2, img: "saloon-car.png" },
  { id: 3, name: "Estate Car", passengers: 4, luggage: 4, img: "estate-car.png" },
  { id: 4, name: "MPV", passengers: 6, luggage: 2, img: "mpv.png" },
  { id: 5, name: "Executive Car", passengers: 4, luggage: 2, img: "executive-car.png" },
  { id: 6, name: "8 Seater Minibus", passengers: 8, luggage: 8, img: "minibus.png" },
  { id: 7, name: "Wheelchair Accessible", passengers: 5, luggage: 0, img: "wheelchair.png" },
];

const VehicleSelection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [extras, setExtras] = useState({
    meetAndGreet: false,
    waitAndReturn: false,
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="bg-white shadow-lg mx-auto p-4 rounded-lg max-w-2xl">
      <h2 className="mb-3 font-semibold text-lg">Choose your vehicle</h2>

      <button className="bg-blue-500 mb-3 px-4 py-2 rounded text-white">🔍 Filter</button>

      <div className="gap-4 grid grid-cols-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`border rounded-lg p-2 flex flex-col items-center cursor-pointer ${
              selectedVehicle === vehicle.id ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setSelectedVehicle(vehicle.id)}
          >
            <img src={vehicle.img} alt={vehicle.name} className="h-12" />
            <p className="font-semibold text-sm">{vehicle.name}</p>
            <p className="text-xs">👤 {vehicle.passengers} | 🛄 {vehicle.luggage}</p>
          </div>
        ))}
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
            <img src="google-pay.png" alt="Google Pay" className="mr-1 h-4" /> Google Pay
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
