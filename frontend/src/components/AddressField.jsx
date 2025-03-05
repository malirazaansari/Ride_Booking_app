import { useState } from "react";
import InputField from "./InputField";

const AddressField = ({ label }) => {
  const [value, setValue] = useState("");
  const [viaFields, setViaFields] = useState([]); // Stores additional input fields

  // Function to add new "Via" input fields (max 2)
  const addViaField = () => {
    if (viaFields.length < 2) {
      setViaFields([...viaFields, ""]); // Add an empty string for new field
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <label className="block mb-1 font-semibold text-sm">{label}</label>

      {/* Main Address Input Field */}
      <InputField
        type="text"
        placeholder="Search for Address..."
        value={value}
        setValue={setValue}
      />

      {/* Dynamically Added "Via" Fields */}
      {viaFields.map((_, index) => (
        <InputField
          key={index}
          type="text"
          placeholder={`Via Address ${index + 1}`}
          value={viaFields[index]}
          setValue={(newValue) => {
            const updatedFields = [...viaFields];
            updatedFields[index] = newValue;
            setViaFields(updatedFields);
          }}
        />
      ))}

      {/* "Add Via" Button - Only Shown if Less Than 2 Additional Fields */}
      {label === "Pick up Address" && viaFields.length < 2 && (
        <button
          onClick={addViaField}
          className="flex items-center gap-2 bg-blue-500 mt-2 px-3 py-2 rounded-lg text-white"
        >
          Add Via <span className="text-lg">+</span>
        </button>
      )}
    </div>
  );
};

export default AddressField;
