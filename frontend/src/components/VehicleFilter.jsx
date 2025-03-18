import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const VehicleFilter = ({ onApply }) => {
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inline-block relative">
      <button
        className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter /> Filter
      </button>

      {isOpen && (
        <div className="left-0 z-10 absolute bg-white shadow-lg mt-2 p-4 rounded w-48">
          <div className="flex justify-between items-center">
            <button
              className="px-2 text-xl"
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
            >
              -
            </button>
            <div className="text-center">
              <p className="font-semibold text-sm">Passengers</p>
              <input
                type="number"
                className="p-1 border rounded w-12 text-center"
                value={passengers}
                readOnly
              />
            </div>
            <button
              className="px-2 text-xl"
              onClick={() => setPassengers(passengers + 1)}
            >
              +
            </button>
          </div>

          <div className="flex justify-between items-center mt-3">
            <button
              className="px-2 text-xl"
              onClick={() => setLuggage(Math.max(0, luggage - 1))}
            >
              -
            </button>
            <div className="text-center">
              <p className="font-semibold text-sm">Luggage</p>
              <input
                type="number"
                className="p-1 border rounded w-12 text-center"
                value={luggage}
                readOnly
              />
            </div>
            <button
              className="px-2 text-xl"
              onClick={() => setLuggage(luggage + 1)}
            >
              +
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 px-4 py-1 rounded text-black"
              onClick={() => {
                setPassengers(1);
                setLuggage(0);
              }}
            >
              Clear
            </button>
            <button
              className="bg-blue-500 px-4 py-1 rounded text-white"
              onClick={() => {
                onApply(passengers, luggage); // Apply the filter
                setIsOpen(false); // Close the filter dropdown
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleFilter;
