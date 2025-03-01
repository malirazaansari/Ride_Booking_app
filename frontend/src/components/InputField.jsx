const InputField = ({ label, type = "text", placeholder }) => {
    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-semibold text-sm">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 w-full"
        />
      </div>
    );
  };
  
  export default InputField;
  