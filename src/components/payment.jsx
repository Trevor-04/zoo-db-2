import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './payment.css'; // You can create this CSS file to add styles

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberId } = useParams(); // Get memberId from the URL
  const { employeeID } = useParams();
  const {
    selectedTime,
    selectedDate,
    adultTickets,
    childTickets,
    seniorTickets,
    infantTickets,
    finalPrice,
  } = location.state || {};

  const [email, setEmail] = useState('');

  const handleBackToTimeSlot = () => {
    if(location.pathname.startsWith('/member'))
      navigate(`/member/${memberId}/tickets`)
      else if(location.pathname.startsWith('/Admin'))
      navigate(`/Admin/${employeeID}/tickets`)
    else navigate('/tickets');
  };

  const handleSubmit = () => {
    // // Handle payment submission logic here
    // navigate('/confirmation', { state: { selectedTime, selectedDate, finalPrice, email } });
    //console.log(memberId);
    alert('Payment successful');
    // if(memberId === 'undefined')
    //   navigate(`/`);
    // else
    //   navigate(`/member/${memberId}`); // Redirect back to MemberPage with dynamic memberId
    if(location.pathname.startsWith('/member'))
      navigate(`/member/${memberId}`)
    else if(location.pathname.startsWith('/Admin'))
      navigate(`/Admin/${employeeID}`)
    else navigate(`/`);
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Page</h2>

      <div className="payment-info">
        <p><strong>Selected Time:</strong> {selectedTime}</p>
        <p><strong>Selected Date:</strong> {selectedDate}</p>
        <p><strong>Adult Tickets:</strong> {adultTickets}</p>
        <p><strong>Child Tickets:</strong> {childTickets}</p>
        <p><strong>Senior Tickets:</strong> {seniorTickets}</p>
        <p><strong>Infant Tickets:</strong> {infantTickets}</p>
        <p><strong>Final Price:</strong> ${finalPrice}</p>
      </div>

      <div className="email-input">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="button-container">
        <button className="back-btn" onClick={handleBackToTimeSlot}>
          Back to Select Time Slot
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
