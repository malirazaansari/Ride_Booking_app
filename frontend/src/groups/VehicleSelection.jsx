import React, { useState } from "react";
import { Car, Bus } from "lucide-react";
import { FaCarSide, FaShuttleVan, FaWheelchair, FaTaxi, FaInfoCircle } from "react-icons/fa";
import VehicleFilter from "../components/VehicleFilter";
import PaymentForm from "../components/PaymentForm";

const vehicleIcons = {
  "Any Car": <FaCarSide size={24} />, 
  "Saloon Car": <FaCarSide size={24} />,
  "Estate Car": <Car size={24} />, 
  "MPV": <FaShuttleVan size={24} />, 
  "Executive Car": <FaTaxi size={24} />, 
  "8 Seater Minibus": <Bus size={24} />, 
  "Wheelchair Accessible Cars": <FaWheelchair size={24} />, 
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

const VehicleSelection = ({ onWaitAndReturnConfirmed }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVehicle, setModalVehicle] = useState(null);
  const [extras, setExtras] = useState({
    meetAndGreet: false,
    waitAndReturn: false,
  });
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showWaitAndReturnModal, setShowWaitAndReturnModal] = useState(false);

  const handleWaitAndReturnChange = () => {
    setExtras({ ...extras, waitAndReturn: !extras.waitAndReturn });
    setShowWaitAndReturnModal(!extras.waitAndReturn);
  };

  const handleWaitAndReturnConfirm = (confirm) => {
    setShowWaitAndReturnModal(false);
    if (confirm) {
      onWaitAndReturnConfirmed();
    } else {
      setExtras({ ...extras, waitAndReturn: false });
    }
  };

  return (
    <div className="bg-white shadow-lg mx-auto p-6 pt-1 rounded-lg max-w-lg">
      <h2 className="mb-3 font-semibold text-lg">Choose your vehicle</h2>

      <VehicleFilter
        onApply={(passengers, luggage) => {
          const updatedVehicles = vehicles.filter(
            (v) => v.passengers >= passengers && v.luggage >= luggage
          );
          setFilteredVehicles(updatedVehicles);
        }}
      />

      <div className="justify-center content-center gap-6 grid grid-cols-3 mt-4">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer text-center w-40 shadow-md transition-all ${
              selectedVehicle === vehicle.id ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setSelectedVehicle(vehicle.id)}
          >
            {vehicleIcons[vehicle.name]}
            <p className="mt-2 font-semibold text-sm">{vehicle.name}</p>
            <p className="flex items-center gap-2 mt-1 text-xs">
              👤 {vehicle.passengers} | 🛄 {vehicle.luggage}
            </p>
            <button
              className="mt-2 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setModalVehicle(vehicle);
              }}
            >
              <FaInfoCircle size={20} />
            </button>
          </div>
        ))}
      </div>

      {modalVehicle && (
        <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
          <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
            <h2 className="font-bold text-lg">{modalVehicle.name}</h2>
            <p className="mt-2 text-sm">{modalVehicle.description}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 mt-4 px-6 py-2 rounded text-white"
              onClick={() => setModalVehicle(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

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
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            checked={extras.waitAndReturn}
            onChange={handleWaitAndReturnChange}
            className="mr-2"
          />
          Wait and Return
        </label>
      </div>

      {showWaitAndReturnModal && (
        <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
          <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
            <h2 className="font-bold text-lg">Wait and Return</h2>
            <p className="mt-2 text-sm">
              This option will select your pickup place as the drop-off place too, and will visit the first selected drop-off place.
              <br /><br />
              Instructions:
              <ul className="text-left list-disc list-inside">
                <li>Your pickup address will be set as the drop-off address.</li>
                <li>The first selected drop-off address will be added as a via address.</li>
                <li>The map and address fields will be updated accordingly.</li>
              </ul>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
                onClick={() => handleWaitAndReturnConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                onClick={() => handleWaitAndReturnConfirm(true)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="mt-5 font-semibold text-lg">Choose your payment method:</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center">
          <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-2" />
          Pay by Cash
        </label>

        <PaymentForm />

        <label className="flex items-center">
          <input type="radio" name="payment" value="googlepay" checked={paymentMethod === "googlepay"} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-2" />
          <span className="flex items-center">
            <img src="g-pay.png" alt="Google Pay" className="mr-1 h-4" /> Google Pay
          </span>
        </label>
      </div>

      <button className="bg-blue-500 mt-5 py-2 rounded-lg w-full font-semibold text-white text-lg">Book Now</button>
    </div>
  );
};

export default VehicleSelection;
