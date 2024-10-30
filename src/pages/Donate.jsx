import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe, Elements} from "@stripe/react-stripe-js";
import { CountryDropdown } from "react-country-region-selector";
import StripeContainer from '../components/StripeContainer';
const {url} = require('../config.json');

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
const pkey = `${process.env.PUBLISHABLE_KEY}`;
const stripeTestPromise = loadStripe(pkey);

function Donate() {
  const initialFormData ={
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  };

  //const [showItem, setShowItem] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [country, setCountry] = useState('');  
  const [isMonthly, setIsMonthly] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const oneTime = [25, 50, 100, 250, 500, 1000];
  const monthlyAmounts = ['10 /mo', '35 /mo', '50 /mo', '75 /mo', '100 /mo', '150 /mo'];
  //const paymentMethods = ['Credit Card'];

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();


  const amounts = isMonthly ? monthlyAmounts : oneTime; 

  const handleCountryChange = (val) => {
    setCountry(val);
    setFormData({ ...formData, country: val }); // Update formData with the country
  };

  const handleDonation = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
        console.error("Stripe.js has not loaded yet.");
        return;
    }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
  
      if (!error) {
        try {
          const { id } = paymentMethod;
          const response = await axios.post(`https::localhost4000/payment`, {
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
  }

  const doBoth = async (e) =>  {
    handleAddDonation(e);
    handleDonation(e);
  }


  const [error, setError] = useState('');

  const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  //add donation to database
  const handleAddDonation = async (e) => {
    e.preventDefault();

    let donationAmount = selectedAmount || customAmount;
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
    
    const newDonation ={
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
      phone: formData.phone,
      amount: parseFloat(donationAmount),
      donationType: isMonthly ? 1 : 0,
    }
    try {
      await axios.post(`${url}/donations/add`, newDonation);
      alert(`Thank you for your donation, ${formData.firstName}!`);
      // resetForm();
      
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  }

  return (
    <Elements stripe={stripeTestPromise}>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-md shadow-md max-w-2xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Donate to the University of Houston Coog Zoo
          </h1>
          <p className="text-sm text-gray-500">(Don't actually donate)</p>
        </header>

        {/* Donation Frequency */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Donation Type</h2>
          <div className="flex justify-center space-x-4">
            <button onClick={() => setIsMonthly(false)}  className={`w-40 py-2 px-4 border font-medium 
            rounded-md bg-gray-50 hover:bg-gray-200 ${
                !isMonthly ? 'border-gray-500 bg-gray-300' : 'border-gray-300'
              }`}
            >
              One-Time
            </button>
            <button onClick={() => setIsMonthly(true)} className={`w-40 py-2 px-4 border 
            font-medium rounded-md bg-gray-50 hover:bg-gray-200
            ${isMonthly ? 'border-gray-500 bg-gray-300' : 'border-gray-300'
            }`}
            >
              ❤️ Monthly
            </button>
          </div>
        </div>

        {/* Gift Amount */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Gift Amount</h2>
          <div className="grid grid-cols-3 gap-4">
            {amounts.map((amount) => (
              <label key={amount} className="block">
                <input
                  type="radio"
                  name="giftAmount"
                  value={amount}
                  className="hidden"
                  onChange={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                />
                <div
                  className={`py-3 px-4 border rounded-md cursor-pointer ${
                    selectedAmount === amount ? 'border-gray-500 bg-gray-200' : 'border-gray-300'
                  }`}
                >
                  ${amount}
                </div>
              </label>
            ))}
            <input
              type="number"
              placeholder="Custom Amount"
              className="py-3 px-2 border rounded-md w-full mt-2"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount('');
              }}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Enter Card Information</h2>
            <form onSubmit={handleDonation}>
              <CardElement options={CARD_OPTIONS} />
              {/* <button
                type="submit"
                className="w-full bg-[#165e229e] text-white py-3 rounded-md font-semibold hover:bg-green-900"
              >
                Donate Now
              </button> */}
            </form>
          </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold">*Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">*First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">*Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold">*Address 1</label>
              <input
                type="text"
                name="address1"
                placeholder="Street Address"
                value={formData.address1}
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold">Address 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                placeholder="Apt., Ste., Bldg."
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">*City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">*State</label>
              <select
                name="state"
                value={formData.state}
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {stateAbbreviations.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">*ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                placeholder="ZIP Code"
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>

            <div >
              <label className="block text-sm font-semibold">*Country</label>
              <CountryDropdown className="w-full"
                        value={country}
                        onChange={handleCountryChange}
            />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold">Mobile Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="(201) 555-0123"
                className="border border-gray-300 p-2 w-full rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <form onSubmit={doBoth}>
          <button
            className="w-full bg-[#165e229e] text-white py-3 rounded-md font-semibold hover:bg-green-900"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
    </Elements>
  );
}

export default function DonateWrapper() {
  return (
    <Elements stripe={stripeTestPromise}>
      <Donate />
    </Elements>
  );
}

// Optionally, export Donate separately if needed for other internal purposes
export { Donate };  
