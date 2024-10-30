/*import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      margin: '1rem',
      iconColor: "#cccccc",  // Grey to match the border color of the input
      color: "black",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#cccccc"  // Light grey for placeholder to match the HTML input
      },
      backgroundColor: "#ffffff",  // Ensure the background is white
      border: "1px solid #cccccc", // Grey border to match the HTML input style
      borderRadius: "0.375rem",   // Rounded corners similar to 'rounded-md'
      padding: "0.5rem",           // Equivalent to 'p-2' in Tailwind CSS
    },
    invalid: {
      iconColor: "#ff1a1a",  // Red color for invalid input icons
      color: "#ff1a1a",      // Red color for text when the input is invalid
      borderColor: "#ff1a1a", // Red border when the input is invalid
    },
  },
};


export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        } else if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
           <button type="submit" className="pay-button w-full bg-[#165e229e] text-white py-3 rounded-md font-semibold hover:bg-green-900">
            Donate Now
          </button> 
          
        
        </form>
      ) : (
        <div>
          <h2>
            success your donation went through!
          </h2>
        </div>
      )}
      
    </>
  );
}
const StripePayment =() => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripePayment;
*/
/*import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";

const PUBLIC_KEY = 'pk_test_51QCZYkAVisrEXHQqWSgfJI7OcJeC7Cbvf61lCUsVssgdZn7ZMxaHmH03oQJPsi4fi8v4otUeEgmlfJq8tTc7dFTR00761dNRcu'
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      margin: '1rem',
      iconColor: "#cccccc",  // Grey to match the border color of the input
      color: "black",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#cccccc"  // Light grey for placeholder to match the HTML input
      },
      backgroundColor: "#ffffff",  // Ensure the background is white
      border: "1px solid #cccccc", // Grey border to match the HTML input style
      borderRadius: "0.375rem",   // Rounded corners similar to 'rounded-md'
      padding: "0.5rem",           // Equivalent to 'p-2' in Tailwind CSS
    },
    invalid: {
      iconColor: "#ff1a1a",  // Red color for invalid input icons
      color: "#ff1a1a",      // Red color for text when the input is invalid
      borderColor: "#ff1a1a", // Red border when the input is invalid
    },
  },
};


export function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        } else if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit" className="pay-button w-full bg-[#165e229e] text-white py-3 rounded-md font-semibold hover:bg-green-900">
            Donate Now
          </button>
          
        
        </form>
      ) : (
        <div>
          <h2>
            success your donation went through!
          </h2>
        </div>
      )}
      
    </>
  );
}

export function StripePayment() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}*/