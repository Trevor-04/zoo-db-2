import React, { useState } from 'react';
import './tickets.css';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useNavigate } from 'react-router-dom';

function TicketOptions() {
  const [visibleSection, setVisibleSection] = useState('generalAdmission');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);

  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [infantTickets, setInfantTickets] = useState(0);
  const navigate = useNavigate(); // Create navigate function here
  const pricing = {
    '9am': { adult: 25, child: 15, senior: 20, infant: 0 },
    '10am': { adult: 20, child: 13.5, senior: 15, infant: 0 },
    '11am': { adult: 25, child: 15, senior: 20, infant: 0 },
    '12pm': { adult: 30, child: 15, senior: 25, infant: 0 },
    '1pm': { adult: 30, child: 15, senior: 25, infant: 0 },
    '2pm': { adult: 20, child: 13.5, senior: 15, infant: 0 },
    '3pm': { adult: 25, child: 15, senior: 20, infant: 0 },
    '4pm': { adult: 30, child: 15, senior: 25, infant: 0 },
    '5pm': { adult: 20, child: 13.5, senior: 15, infant: 0 },
  };

  // Handle date change and update state
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    setIsDateSelected(true);
  };

  const calculateTotalPrice = (time) => {
    const rates = pricing[time];
    return (
      (adultTickets * rates.adult) +
      (childTickets * rates.child) +
      (seniorTickets * rates.senior) +
      (infantTickets * rates.infant)
    );
  };

  const TimeSlots = () => {
    const formattedDate = new Date(selectedDate + "T00:00").toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  
    // Get the current time
    const now = new Date();
    const currentHour = now.getHours();
  
    // Determine if the selected date is today
    const isToday = new Date(selectedDate).toDateString() === now.toDateString();
  
    // Check if a time slot is in the past for today
    const isTimeSlotDisabled = (time) => {
      const hour = parseInt(time); // Extract the hour from the time (e.g., '9am' becomes 9)
      
      // Disable time slots only for today if the time is before the current time
      return isToday && hour <= currentHour;
    };
  
    // Handle time slot selection and navigate to payment page
    const handleTimeSlotClick = (time) => {
      if (!isTimeSlotDisabled(time)) {
        // Assuming you have a navigate function to go to the payment page
        navigate("/payment", { state: { selectedTime: time, selectedDate, adultTickets, childTickets, seniorTickets, infantTickets } });
        console.log(time, selectedDate, adultTickets, childTickets, seniorTickets, infantTickets);
        const date_purchased = new Date()
        // adult = 0, child = 1, senior = 2, infant = 3;
        const tickets = [adultTickets, childTickets, seniorTickets, infantTickets];
        const ticketType = 0;
        

        console.log(date_purchased);
        

      }
    };
  
    const handleSubmitButton = () => {

    }

    return (
      <div className="general-admission">
        <button 
          className="update-tickets-button"
          onClick={() => setShowTimeSlots(false)} // Go back to General Admission view
        >
          Update Tickets
        </button>
  
        <h2>{formattedDate}</h2>
  
        <div className="time-slots-container">
          {/* Morning Time Slots */}
          <div className="time-slot-column">
            <h3>Morning</h3>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(9) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(9)}
            >
              <h4><strong>9am</strong></h4>
              {isTimeSlotDisabled(9) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('9am').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(10) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(10)}
            >
              <h4><strong>10am</strong></h4>
              {isTimeSlotDisabled(10) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('10am').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(11) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(11)}
            >
              <h4><strong>11am</strong></h4>
              {isTimeSlotDisabled(11) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('11am').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
          </div>
  
          {/* Afternoon Time Slots */}
          <div className="time-slot-column">
            <h3>Afternoon</h3>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(12) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(12)}
            >
              <h4><strong>12pm</strong></h4>
              {isTimeSlotDisabled(12) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('12pm').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(13) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(13)}
            >
              <h4><strong>1pm</strong></h4>
              {isTimeSlotDisabled(13) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('1pm').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(14) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(14)}
            >
              <h4><strong>2pm</strong></h4>
              {isTimeSlotDisabled(14) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('2pm').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
          </div>
  
          {/* Evening Time Slots */}
          <div className="time-slot-column">
            <h3>Evening</h3>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(15) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(15)}
            >
              <h4><strong>3pm</strong></h4>
              {isTimeSlotDisabled(15) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('3pm').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(16) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(16)}
            >
              <h4><strong>4pm</strong></h4>
              {isTimeSlotDisabled(16) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('4pm').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
            <div
              className={`time-slot-box ${isTimeSlotDisabled(17) ? 'disabled' : ''}`}
              onClick={() => handleTimeSlotClick(17)}
            >
              <h4><strong>5pm</strong></h4>
              {isTimeSlotDisabled(17) ? <p>Unavailable</p> : (
                <>
                  <p>Total Price: <strong>${calculateTotalPrice('5pm').toFixed(2)}</strong></p>
                  <p>
                    {adultTickets > 0 && `${adultTickets} x Adult, `}
                    {childTickets > 0 && `${childTickets} x Child, `}
                    {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                    {infantTickets > 0 && `${infantTickets} x Infant`}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  

  const GeneralAdmission = () => (
    <div className="general-admission">
      <h2>General Admission</h2>
      <div className="ticket-categories">
        <div className="ticket-category">
          <label>Adult (Ages 13-64)</label>
          <input 
            type="number" 
            min="0" 
            value={adultTickets}
            onChange={(e) => setAdultTickets(Number(e.target.value))} 
          />
        </div>
        <div className="ticket-category">
          <label>Child (Ages 3-12)</label>
          <input 
            type="number" 
            min="0" 
            value={childTickets}
            onChange={(e) => setChildTickets(Number(e.target.value))} 
          />
        </div>
        <div className="ticket-category">
          <label>Senior (65+)</label>
          <input 
            type="number" 
            min="0" 
            value={seniorTickets}
            onChange={(e) => setSeniorTickets(Number(e.target.value))} 
          />
        </div>
        <div className="ticket-category">
          <label>Infant (2 & Under)</label>
          <input 
            type="number" 
            min="0" 
            value={infantTickets}
            onChange={(e) => setInfantTickets(Number(e.target.value))} 
          />
        </div>
        <div className="ticket-date">
          <label><strong>When?</strong></label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={handleDateChange} 
            min={new Date().toISOString().split("T")[0]} // Disables past dates
          />
        </div>
        <button 
          className="continue-button" 
          onClick={() => isDateSelected ? setShowTimeSlots(true) : alert('Please select a date!')}
        >
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <ul className="ticket-list">
        <li className="ticket-item">
          <button
            className={`ticket-link ${visibleSection === 'generalAdmission' ? 'active' : ''}`}
            onClick={() => setVisibleSection('generalAdmission')}
          >
            General Admission
          </button>
        </li>
        <li className="ticket-item">
          <Link to="/discounted-tickets" className="ticket-link">Discounted Tickets</Link>
        </li>
        <li className="ticket-item">
          <Link to="/Signup" className="ticket-link">Membership Portal</Link>
        </li>
      </ul>

      <div className="general-admission-container">
        {visibleSection === 'generalAdmission' && (
          showTimeSlots ? <TimeSlots /> : <GeneralAdmission />
        )}
      </div>
    </div>
  );
}

export default TicketOptions;
