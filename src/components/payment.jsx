import React from 'react';
import { useLocation } from 'react-router-dom';
import './tickets.css';
const Payment = () => {
  const location = useLocation();
  
  // Access the state passed from the TicketOptions component
  const { selectedTime, selectedDate, adultTickets, childTickets, seniorTickets, infantTickets } = location.state || {};

  return (
    <div>
      <header className='w-full text-center text-white font-bold bg-[#165e229e] py-12'>
        <h1 className="relative text-2xl md:text-4xl lg:text-5xl">Payment Confirmation</h1>
      </header>
      <h2>Payment Page</h2>
      <p>You selected: {selectedTime}</p>
      <p>Date: {selectedDate}</p>
      <p>Adult Tickets: {adultTickets}</p>
      <p>Child Tickets: {childTickets}</p>
      <p>Senior Tickets: {seniorTickets}</p>
      <p>Infant Tickets: {infantTickets}</p>
      {/* Payment form will go here */}
    </div>
  );
};

export default Payment;
