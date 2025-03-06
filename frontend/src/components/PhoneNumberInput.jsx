import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { X } from "lucide-react";

const PhoneNumberInput = ({ label }) => {
  const [phone, setPhone] = useState("");

  return (
    <div className="relative mb-4">
      {label && <label className="block mb-1 font-semibold text-sm">{label}</label>}
      <div className="relative flex items-center border border-gray-500 rounded-lg w-full">
        <PhoneInput
          country={"gb"}
          value={phone}
          onChange={setPhone}
          inputClass="!w-full !h-10 !pl-14 !border-none !bg-transparent !text-gray-800"
          containerClass="!w-full !rounded-lg"
          buttonClass="!bg-transparent"
          dropdownClass="!z-50"
        />

        {phone && (
          <button
            onClick={() => setPhone("")}
            className="top-1/2 right-2 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
