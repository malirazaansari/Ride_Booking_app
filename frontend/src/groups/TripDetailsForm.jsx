// import { useState, useEffect } from "react";
// import InputField from "../components/InputField";
// import AddressField from "../components/AddressField";
// import "react-phone-input-2/lib/style.css";
// import ProgressTracker from "../components/ProgressTracker";
// import PhoneNumberInput from "../components/PhoneNumberInput";

// const TripDetailsForm = ({ pickupPlace, onPlaceSelected, addViaPlace, isWaitAndReturn, onTripDetailsChange, onDateTimeChange }) => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedHour, setSelectedHour] = useState("");
//   const [selectedMinute, setSelectedMinute] = useState("");
//   const [isLaterSelected, setIsLaterSelected] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     notes: "",
//   });

//   const getCurrentDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinutes = Math.ceil(now.getMinutes() / 5) * 5;

//     return {
//       hour: currentHour,
//       minute: currentMinutes >= 60 ? 0 : currentMinutes,
//     };
//   };

//   useEffect(() => {
//     setSelectedDate(getCurrentDate());
//     const { hour, minute } = getCurrentTime();
//     setSelectedHour(hour);
//     setSelectedMinute(minute);
//   }, []);

//   useEffect(() => {
//     const now = new Date();
//     const selectedDateTime = new Date(selectedDate);
//     selectedDateTime.setHours(selectedHour, selectedMinute);

//     const timeDifference = (selectedDateTime - now) / (1000 * 60); 
//     setIsLaterSelected(timeDifference > 60);
//   }, [selectedDate, selectedHour, selectedMinute]);

//   useEffect(() => {
//     const selectedDateTime = `${selectedDate} ${selectedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;
//     onDateTimeChange(selectedDateTime); // Notify parent about the selected date and time
//   }, [selectedDate, selectedHour, selectedMinute, onDateTimeChange]);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   useEffect(() => {
//     onTripDetailsChange(formData);
//   }, [formData, onTripDetailsChange]);

//   return (
//     <div className="bg-white shadow-lg mx-auto p-6 pb-1 rounded-lg max-w-lg">
//       <ProgressTracker />
//       <h2 className="mb-4 font-bold text-xl text-center">Your trip details</h2>

//       <InputField label="Name" placeholder="Enter your name" value={formData.name}
//         onChange={(e) => handleInputChange("name", e.target.value)}/>
//       <PhoneNumberInput label="Phone Number" value={formData.phone} onChange={(phone) => handleInputChange("phone", phone)} />
//       <InputField label="Email" type="email" placeholder="Enter your email" value={formData.email}
//         onChange={(e) => handleInputChange("email", e.target.value)}/>

//       <AddressField
//         label="Pick up Address"
//         value={pickupPlace}
//         onPlaceSelected={(place, index) => onPlaceSelected(place, index === null ? "pickup" : "via", index)}
//         addViaPlace={addViaPlace}
//         isWaitAndReturn={isWaitAndReturn}
//         pickupPlace={pickupPlace}
//       />
//       <AddressField
//         label="Drop Off Address"
//         value={pickupPlace}
//         onPlaceSelected={(place) => onPlaceSelected(place, "dropoff")}
//         isWaitAndReturn={isWaitAndReturn}
//         pickupPlace={pickupPlace}
//       />

//       <div className="flex items-center gap-2 mt-4">
//         <button
//           className={`px-4 py-2 rounded-lg ${
//             !isLaterSelected ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
//           }`}
//           onClick={() => setIsLaterSelected(false)}
//         >
//           Now
//         </button>
//         <button
//           className={`px-4 py-2 rounded-lg ${
//             isLaterSelected ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
//           }`}
//           onClick={() => setIsLaterSelected(true)}
//         >
//           Later
//         </button>

//         <input type="date" className="p-2 border rounded-lg" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

//         <select className="p-2 border rounded-lg" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
//           {[...Array(24)].map((_, i) => (
//             <option key={i} value={i}>
//               {i}
//             </option>
//           ))}
//         </select>

//         <p className="text-gray-800">:</p>

//         <select className="p-2 border rounded-lg" value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
//           {[...Array(12)].map((_, i) => {
//             const value = i * 5;
//             return (
//               <option key={value} value={value}>
//                 {value.toString().padStart(2, "0")}
//               </option>
//             );
//           })}
//         </select>
//       </div>

//       <InputField label="Notes for the driver" placeholder="Any additional notes..." value={formData.notes} onChange={(e) => handleInputChange("notes", e.target.value)} />
//     </div>
//   );
// };

// export default TripDetailsForm;



import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import AddressField from "../components/AddressField";
import "react-phone-input-2/lib/style.css";
import ProgressTracker from "../components/ProgressTracker";
import PhoneNumberInput from "../components/PhoneNumberInput";
import DateTimePicker from "../components/DateTimePicker";

const TripDetailsForm = ({ pickupPlace, onPlaceSelected, addViaPlace, isWaitAndReturn, onTripDetailsChange, onDateTimeChange }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [isLaterSelected, setIsLaterSelected] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = Math.ceil(now.getMinutes() / 5) * 5;

    return {
      hour: currentHour,
      minute: currentMinutes >= 60 ? 0 : currentMinutes,
    };
  };

  useEffect(() => {
    setSelectedDate(getCurrentDate());
    const { hour, minute } = getCurrentTime();
    setSelectedHour(hour);
    setSelectedMinute(minute);
  }, []);

  useEffect(() => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedHour, selectedMinute);

    const timeDifference = (selectedDateTime - now) / (1000 * 60); 
    setIsLaterSelected(timeDifference > 60);
  }, [selectedDate, selectedHour, selectedMinute]);

  useEffect(() => {
    const selectedDateTime = `${selectedDate} ${selectedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;
    onDateTimeChange(selectedDateTime); // Notify parent about the selected date and time
  }, [selectedDate, selectedHour, selectedMinute, onDateTimeChange]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    onTripDetailsChange(formData);
  }, [formData, onTripDetailsChange]);

  return (
    <div className="bg-white shadow-lg mx-auto p-6 pb-1 rounded-lg max-w-lg">
      <ProgressTracker />
      <h2 className="mb-4 font-bold text-xl text-center">Your trip details</h2>

      <InputField label="Name" placeholder="Enter your name" value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}/>
      <PhoneNumberInput label="Phone Number" value={formData.phone} onChange={(phone) => handleInputChange("phone", phone)} />
      <InputField label="Email" type="email" placeholder="Enter your email" value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}/>

      <AddressField
        label="Pick up Address"
        value={pickupPlace}
        onPlaceSelected={(place, index) => onPlaceSelected(place, index === null ? "pickup" : "via", index)}
        addViaPlace={addViaPlace}
        isWaitAndReturn={isWaitAndReturn}
        pickupPlace={pickupPlace}
      />
      <AddressField
        label="Drop Off Address"
        value={pickupPlace}
        onPlaceSelected={(place) => onPlaceSelected(place, "dropoff")}
        isWaitAndReturn={isWaitAndReturn}
        pickupPlace={pickupPlace}
      />

      <DateTimePicker
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        selectedMinute={selectedMinute}
        onDateChange={setSelectedDate}
        onHourChange={setSelectedHour}
        onMinuteChange={setSelectedMinute}
        isLaterSelected={isLaterSelected}
        onNowClick={() => setIsLaterSelected(false)}
        onLaterClick={() => setIsLaterSelected(true)}
      />

      <InputField label="Notes for the driver" placeholder="Any additional notes..." value={formData.notes} onChange={(e) => handleInputChange("notes", e.target.value)} />
    </div>
  );
};

export default TripDetailsForm;