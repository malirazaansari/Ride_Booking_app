const WaitAndReturnModal = ({ onConfirm, onClose }) => (
    <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
        <h2 className="font-bold text-lg">Wait and Return</h2>
        <p className="mt-2 text-sm">
          This option will select your pickup place as the drop-off place too, and will visit the first selected drop-off place.
        </p>
        <p className="mt-2 text-sm">Instructions:</p>
        <ul className="text-left list-disc list-inside">
          <li>Your pickup address will be set as the drop-off address.</li>
          <li>The first selected drop-off address will be added as a via address.</li>
          <li>The map and address fields will be updated accordingly.</li>
        </ul>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
            onClick={() => {
              onConfirm(false); // Ensuring the function is correctly triggered
              onClose(); // Close modal if onClose is provided
            }}
          >
            No
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={() => {
              onConfirm(true); // Ensuring the function is correctly triggered
              onClose(); // Close modal if onClose is provided
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
  
  export default WaitAndReturnModal;
  