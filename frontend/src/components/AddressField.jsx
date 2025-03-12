import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react"; // Import trash icon
import InputField from "./InputField";

const AddressField = ({ label, onPlaceSelected, addViaPlace }) => {
  const [value, setValue] = useState("");
  const [viaFields, setViaFields] = useState([]);
  const autocompleteRef = useRef(null);
  const viaRefs = useRef([]);

  const addViaField = (place = "") => {
    if (viaFields.length < 3) {
      setViaFields([...viaFields, place]);
      viaRefs.current.push(React.createRef());
    }
  };

  const removeViaField = (index) => {
    setViaFields(viaFields.filter((_, i) => i !== index));
    viaRefs.current.splice(index, 1);
  };

  const handlePlaceSelected = (autocomplete, index = null) => {
    const place = autocomplete.getPlace();
    if (index === null) {
      setValue(place.formatted_address);
    } else {
      const updatedFields = [...viaFields];
      updatedFields[index] = place.formatted_address;
      setViaFields(updatedFields);
    }
    if (onPlaceSelected) {
      onPlaceSelected(place, index);
    }
  };

  useEffect(() => {
    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);
      autocomplete.addListener("place_changed", () => handlePlaceSelected(autocomplete));
    }
    viaRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(ref.current);
        autocomplete.addListener("place_changed", () => handlePlaceSelected(autocomplete, index));
      }
    });
  }, [viaFields]);

  useEffect(() => {
    if (addViaPlace) {
      addViaField(addViaPlace.formatted_address);
    }
  }, [addViaPlace]);

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <label className="block mb-1 font-semibold text-sm">{label}</label>

      {/* Main Address Field with Autocomplete */}
      <input
        ref={autocompleteRef}
        type="text"
        placeholder="Search for Address..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-2 border rounded-lg w-full"
      />

      {/* Via Address Fields with Delete Button */}
      {viaFields.map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            ref={viaRefs.current[index]}
            type="text"
            placeholder={`Via Address ${index + 1}`}
            value={viaFields[index]}
            onChange={(e) => {
              const updatedFields = [...viaFields];
              updatedFields[index] = e.target.value;
              setViaFields(updatedFields);
            }}
            className="p-2 border rounded-lg w-full"
          />
          <button
            onClick={() => removeViaField(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      {label === "Pick up Address" && viaFields.length < 3 && (
        <button
          onClick={() => addViaField()}
          className="flex items-center gap-2 bg-blue-500 mt-2 px-3 py-2 rounded-lg text-white"
        >
          Add Via <span className="text-lg">+</span>
        </button>
      )}
    </div>
  );
};

export default AddressField;
