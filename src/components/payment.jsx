import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedTime,
    selectedDate,
    adultTickets,
    childTickets,
    seniorTickets,
    infantTickets,
    finalPrice,
  } = location.state || {};

  const [email, setEmail] = useState(''); // Email input state

  const handleBackToTimeSlot = () => {
    navigate('/tickets'); // Assuming '/tickets' is the route for the ticket selection page
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Selected Time: {selectedTime}</p>
      <p>Selected Date: {selectedDate}</p>
      <p>Adult Tickets: {adultTickets}</p>
      <p>Child Tickets: {childTickets}</p>
      <p>Senior Tickets: {seniorTickets}</p>
      <p>Infant Tickets: {infantTickets}</p>
      <p>Final Price: ${finalPrice}</p>

      {/* Email input field */}
      <div>
        <label>Email Address:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
        />
      </div>

      {/* Back button to return to ticket selection page */}
      <button onClick={handleBackToTimeSlot}>Back to Select Time Slot</button>

      {/* Payment form will go here */}
    </div>
  );
};

export default Payment;