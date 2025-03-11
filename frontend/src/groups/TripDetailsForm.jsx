import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import AddressField from "../components/AddressField";
import "react-phone-input-2/lib/style.css";
import ProgressTracker from "../components/ProgressTracker";
import PhoneNumberInput from "../components/PhoneNumberInput";

const TripDetailsForm = ({ onPlaceSelected }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  // Function to get the current hour and nearest 5-minute increment
  const getCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = Math.ceil(now.getMinutes() / 5) * 5; // Round to nearest 5

    return {
      hour: currentHour,
      minute: currentMinutes >= 60 ? 0 : currentMinutes, // Reset to 0 if 60
    };
  };

  // Set initial values on mount
  useEffect(() => {
    setSelectedDate(getCurrentDate());
    const { hour, minute } = getCurrentTime();
    setSelectedHour(hour);
    setSelectedMinute(minute);
  }, []);

  return (
    <div className="bg-white shadow-lg mx-auto p-6 pb-1 rounded-lg max-w-lg">
      <ProgressTracker />
      <h2 className="mb-4 font-bold text-xl text-center">Your trip details</h2>

      <InputField label="Name" placeholder="Enter your name" />
      <PhoneNumberInput label="Phone Number" />
      <InputField label="Email" type="email" placeholder="Enter your email" />

      <AddressField label="Pick up Address" onPlaceSelected={(place, index) => onPlaceSelected(place, index === null ? "pickup" : "via", index)} />
      <AddressField label="Drop Off Address" onPlaceSelected={(place) => onPlaceSelected(place, "dropoff")} />

      <div className="flex items-center gap-2 mt-4">
        <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">Now</button>
        <button className="bg-gray-200 px-4 py-2 rounded-lg text-black">Later</button>

        {/* Date Picker */}
        <input
          type="date"
          className="p-2 border rounded-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Hour Selector */}
        <select
          className="p-2 border rounded-lg"
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
        >
          {[...Array(24)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <p className="text-gray-800">:</p>

        {/* Minute Selector */}
        <select
          className="p-2 border rounded-lg"
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(e.target.value)}
        >
          {[...Array(12)].map((_, i) => {
            const value = i * 5;
            return (
              <option key={value} value={value}>
                {value.toString().padStart(2, "0")}
              </option>
            );
          })}
        </select>
      </div>

      <InputField label="Notes for the driver" placeholder="Any additional notes..." />
    </div>
  );
};

export default TripDetailsForm;
