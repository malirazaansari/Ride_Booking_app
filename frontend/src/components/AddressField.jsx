import { useState } from "react";
import InputField from "./InputField";
const AddressField = ({ label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <label className="block mb-1 font-semibold text-sm">{label}</label>
      <InputField
        type="text"
        placeholder="Search for Address..."
        value={value}
        setValue={setValue}
      />
      {label === "Pick up Address" && (
        <button className="flex items-center gap-2 bg-blue-500 mt-2 px-3 py-2 rounded-lg text-white">
          Add Via <span className="text-lg">+</span>
        </button>
      )}
    </div>
  );
};

export default AddressField;