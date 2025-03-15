import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react"; 
import InputField from "./InputField";

const AddressField = ({ label, onPlaceSelected, addViaPlace, isWaitAndReturn, pickupPlace }) => {
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
    if (!place || !place.formatted_address) return;

    if (index === null) {
      setValue(place.formatted_address);
    } else {
      setViaFields((prev) => prev.map((val, i) => (i === index ? place.formatted_address : val)));
    }

    if (onPlaceSelected) {
      onPlaceSelected(place, index);
    }
  };

  useEffect(() => {
    if (autocompleteRef.current && !autocompleteRef.current.autocomplete) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);
      autocomplete.addListener("place_changed", () => handlePlaceSelected(autocomplete));
      autocompleteRef.current.autocomplete = autocomplete;
    }
  }, []);

  useEffect(() => {
    viaRefs.current.forEach((ref, index) => {
      if (ref && ref.current && !ref.current.autocomplete) {
        const autocomplete = new window.google.maps.places.Autocomplete(ref.current);
        autocomplete.addListener("place_changed", () => handlePlaceSelected(autocomplete, index));
        ref.current.autocomplete = autocomplete;
      }
    });
  }, [viaFields]);

  useEffect(() => {
    if (addViaPlace) {
      addViaField(addViaPlace.formatted_address);
    }
  }, [addViaPlace]);

  useEffect(() => {
    if (isWaitAndReturn && label === "Drop Off Address") {
      console.log("Pickup Place:", pickupPlace);
      setValue(pickupPlace?.formatted_address || "");  
    }
  }, [isWaitAndReturn, label, pickupPlace]);

  return (
    <div className="mb-4 p-4 border border-gray-600 rounded-lg">
      <label className="block mb-1 font-semibold text-sm">{label}</label>

      <input
        ref={autocompleteRef}
        type="text"
        placeholder="Search for Address..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-2 border border-gray-500 rounded-lg w-full"
        readOnly={isWaitAndReturn && label === "Drop Off Address"}
      />

      {viaFields.map((_, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
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
            className="p-2 border border-gray-500 rounded-lg w-full"
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