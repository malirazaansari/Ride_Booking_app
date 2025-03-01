const AddressField = ({ label }) => {
    return (
      <div className="mb-4 p-4 border rounded-lg">
        <label className="block mb-1 font-semibold text-sm">{label}</label>
        <input
          type="text"
          placeholder="Search for Address..."
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 w-full"
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
  