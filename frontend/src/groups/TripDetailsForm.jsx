import InputField from "../components/InputField";
import AddressField from "../components/AddressField";

const TripDetailsForm = () => {
  return (
    <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-lg">
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
          <option>16</option>
          <option>17</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>20</option>
          <option>30</option>
        </select>
      </div>

      <InputField label="Notes for the driver" placeholder="Any additional notes..." />
    </div>
  );
};

export default TripDetailsForm;
