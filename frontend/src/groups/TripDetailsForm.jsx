import InputField from "../components/InputField";
import AddressField from "../components/AddressField";

import ProgressTracker from "../components/ProgressTracker";
const TripDetailsForm = () => {
  return (
    <div className="bg-white shadow-lg mx-auto p-6 pb-1 rounded-lg max-w-lg">
      <ProgressTracker />
      <h2 className="mb-4 font-bold text-xl text-center">Your trip details</h2>

      <InputField label="Name" placeholder="Enter your name" />
      <InputField label="Phone Number" type="tel" placeholder="+44 | Phone Number" />
      <InputField label="Email" type="email" placeholder="Enter your email" />

      <AddressField label="Pick up Address" />
      <AddressField label="Drop Off Address" />

      <div className="flex items-center gap-2 mt-4">
        <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">Now</button>
        <button className="bg-gray-200 px-4 py-2 rounded-lg text-black">Later</button>
        <input type="date" className="p-2 border rounded-lg" />
        <select className="p-2 border rounded-lg">
          {[...Array(24)].map((_, i) => (
            <option key={i}>{i}</option>
          ))}
        </select>

        <p className="text-gray-800">:</p>
        <select className="p-2 border rounded-lg">
          {[...Array(12)].map((_, i) => (
            <option key={i}>{(i * 5).toString().padStart(2, "0")}</option>
          ))}
        </select>

      </div>

      <InputField label="Notes for the driver" placeholder="Any additional notes..." />
    </div>
  );
};

export default TripDetailsForm;
