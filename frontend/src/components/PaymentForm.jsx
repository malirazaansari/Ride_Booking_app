// import { useState } from "react";
// import InputField from "./InputField";

// const PaymentForm = () => {
//   const [showCardModal, setShowCardModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [cardDetails, setCardDetails] = useState({
//     name: "",
//     cardNumber: "",
//     expiry: "",
//     cvc: "",
//     billingAddress: "",
//   });

//   const handlePaymentChange = (e) => {
//     const value = e.target.value;
//     setPaymentMethod(value);
    
//     if (value === "card") {
//       setShowCardModal(true);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setCardDetails((prev) => ({ ...prev, [field]: value }));
//   };

//   const isCardDetailsComplete = () => {
//     console.log(cardDetails); 
//     return (
//       cardDetails.name.trim() &&
//       cardDetails.cardNumber.trim() &&
//       cardDetails.expiry.trim() &&
//       cardDetails.cvc.trim() &&
//       cardDetails.billingAddress.trim()
//     );
//   };

//   const handleCancel = () => {
//     setPaymentMethod(""); 
//     setShowCardModal(false);
//   };

//   const handleSave = () => {
//     if (isCardDetailsComplete()) {
//       setShowCardModal(false);
//     } else {
//       alert("Please fill in all card details.");
//     }
//   };

//   return (
//     <>
//       <label className="flex items-center cursor-pointer">
//         <input
//           type="radio"
//           name="payment"
//           value="card"
//           checked={paymentMethod === "card"}
//           onChange={handlePaymentChange}
//           className="mr-2"
//         />
//         Pay by Card
//       </label>

//       {showCardModal && (
//         <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
//           <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
//             <h2 className="font-bold text-lg">Enter Card Details</h2>
//             <div className="mt-4">
//               <InputField
//                 label="Name"
//                 placeholder="Enter your name"
//                 value={cardDetails.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//               />
//               <InputField
//                 label="Card Number"
//                 placeholder="1234 5678 9101 1121"
//                 value={cardDetails.cardNumber}
//                 onChange={(e) => handleInputChange("cardNumber", e.target.value)}
//               />
//               <InputField
//                 label="Expiration Date"
//                 placeholder="MM/YY"
//                 value={cardDetails.expiry}
//                 onChange={(e) => handleInputChange("expiry", e.target.value)}
//               />
//               <InputField
//                 label="CVC"
//                 placeholder="123"
//                 value={cardDetails.cvc}
//                 onChange={(e) => handleInputChange("cvc", e.target.value)}
//               />
//               <InputField
//                 label="Billing Address"
//                 placeholder="Enter your address"
//                 value={cardDetails.billingAddress}
//                 onChange={(e) => handleInputChange("billingAddress", e.target.value)}
//               />
//             </div>
//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
//                 onClick={handleSave}
//               >
//                 Save Card
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;



import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import InputField from "./InputField";

const PaymentForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  // const [showCardModal, setShowCardModal] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState("");
  // const [cardDetails, setCardDetails] = useState({
  //   name: "",
  //   cardNumber: "",
  //   expiry: "",
  //   cvc: "",
  //   billingAddress: "",
  // });

  // const handlePaymentChange = (e) => {
  //   const value = e.target.value;
  //   setPaymentMethod(value);
    
  //   if (value === "card") {
  //     setShowCardModal(true);
  //   }
  // };

  // const handleInputChange = (field, value) => {
  //   setCardDetails((prev) => ({ ...prev, [field]: value }));
  // };

  // const isCardDetailsComplete = () => {
  //   console.log(cardDetails); 
  //   return (
  //     cardDetails.name.trim() &&
  //     cardDetails.cardNumber.trim() &&
  //     cardDetails.expiry.trim() &&
  //     cardDetails.cvc.trim() &&
  //     cardDetails.billingAddress.trim()
  //   );
  // };

  // const handleCancel = () => {
  //   setPaymentMethod(""); 
  //   setShowCardModal(false);
  // };

  // const handleSave = () => {
  //   if (isCardDetailsComplete()) {
  //     setShowCardModal(false);
  //   } else {
  //     alert("Please fill in all card details.");
  //   }
  // };

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd" }),
         mode: 'cors', // Ensure CORS is enabled
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        alert("Payment failed: " + error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="card"
          checked={paymentMethod === "card"}
          onChange={handlePaymentChange}
          className="mr-2"
        />
        Pay by Card
      </label> */}

      {/* {showCardModal && (
        <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-gray-500/50 w-screen h-screen">
          <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
            <h2 className="font-bold text-lg">Enter Card Details</h2>
            <div className="mt-4">
              <InputField
                label="Name"
                placeholder="Enter your name"
                value={cardDetails.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <InputField
                label="Card Number"
                placeholder="1234 5678 9101 1121"
                value={cardDetails.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              />
              <InputField
                label="Expiration Date"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
              />
              <InputField
                label="CVC"
                placeholder="123"
                value={cardDetails.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value)}
              />
              <InputField
                label="Billing Address"
                placeholder="Enter your address"
                value={cardDetails.billingAddress}
                onChange={(e) => handleInputChange("billingAddress", e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                onClick={handleSave}
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )} */}

      <div>
        <CardElement className="p-2 border rounded-lg" />
        <button
          className="bg-blue-500 hover:bg-blue-600 mt-4 px-6 py-2 rounded text-white"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay And Book Now"}
        </button>
      </div>
    </>
  );
};

export default PaymentForm;
