const BookingSummaryModal = ({ bookingSummary, onClose }) => (
    <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
        <h2 className="font-bold text-lg">Booking Summary</h2>
        <p className="mt-2 text-sm">
          <strong>Pickup Place:</strong> {bookingSummary.pickupPlace?.formatted_address || "N/A"} <br />
          <strong>Dropoff Place:</strong> {bookingSummary.dropoffPlace?.formatted_address || "N/A"} <br />
          <strong>Via Places:</strong> {bookingSummary.viaPlaces.map((place, idx) => (
            <span key={idx}>{place.formatted_address}{idx < bookingSummary.viaPlaces.length - 1 ? ", " : ""}</span>
          )) || "None"} <br />
          <strong>Distance:</strong> {bookingSummary.distance.toFixed(2)} km <br />
          <strong>Name:</strong> {bookingSummary.tripDetails.name} <br />
          <strong>Email:</strong> {bookingSummary.tripDetails.email} <br />
          <strong>Phone:</strong> {bookingSummary.tripDetails.phone} <br />
          <strong>Notes:</strong> {bookingSummary.tripDetails.notes || "None"} <br />
          <strong>Selected Vehicle:</strong> {bookingSummary.selectedVehicle?.name || "N/A"} <br />
          <strong>Extras:</strong> {bookingSummary.extras.meetAndGreet ? "Meet and Greet" : "None"} {bookingSummary.extras.waitAndReturn ? ", Wait and Return" : ""} <br />
          <strong>Payment Method:</strong> {bookingSummary.paymentMethod} <br />
          <strong>Date and Time:</strong> {bookingSummary.selectedDateTime || "N/A"} <br />
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 mt-4 px-6 py-2 rounded text-white"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
  
  export default BookingSummaryModal;
  