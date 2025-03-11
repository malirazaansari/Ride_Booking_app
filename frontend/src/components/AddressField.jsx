import { useState } from "react";
import { Trash2 } from "lucide-react"; // Import trash icon
import InputField from "./InputField";

const AddressField = ({ label }) => {
  const [value, setValue] = useState("");
  const [viaFields, setViaFields] = useState([]);

  // Add a new via address field
  const addViaField = () => {
    if (viaFields.length < 3) {
      setViaFields([...viaFields, ""]);
    }
  };

  // Remove a via address field by index
  const removeViaField = (index) => {
    setViaFields(viaFields.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <label className="block mb-1 font-semibold text-sm">{label}</label>

      {/* Main Address Field */}
      <InputField
        type="text"
        placeholder="Search for Address..."
        value={value}
        setValue={setValue}
      />

      {/* Via Address Fields with Delete Button */}
      {viaFields.map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <InputField
            type="text"
            placeholder={`Via Address ${index + 1}`}
            value={viaFields[index]}
            setValue={(newValue) => {
              const updatedFields = [...viaFields];
              updatedFields[index] = newValue;
              setViaFields(updatedFields);
            }}
          />
          {/* Delete Button (Trash Icon) */}
          <button
            onClick={() => removeViaField(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      {/* Add Via Button (Appears only if less than 3 via fields) */}
      {label === "Pick up Address" && viaFields.length < 3 && (
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
