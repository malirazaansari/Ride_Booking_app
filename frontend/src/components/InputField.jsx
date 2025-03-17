// import { useState } from "react";
import { X } from "lucide-react";

const InputField = ({ label, type = "text", placeholder,value, onChange }) => {
  // const [value, setValue] = useState("");

  return (
    <div className="relative mb-4">
      {label && <label className="block mb-1 font-semibold text-sm">{label}</label>}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          // onChange={(e) => setValue(e.target.value)}
          onChange={onChange} // Use the onChange passed from the parent
          className="px-3 py-2 pr-10 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 w-full"
        />
        {value && (
          <button
          onClick={() => onChange({ target: { value: "" } })}
            className="top-1/2 right-2 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2 transform"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
