import React, { useState } from 'react';
import './tickets.css';
import { Link } from 'react-router-dom';

function TicketOptions() {
  const [visibleSection, setVisibleSection] = useState('generalAdmission');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);

  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [infantTickets, setInfantTickets] = useState(0);

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

    return (
      <div className="general-admission">
        <button 
          className="update-tickets-button"
          onClick={() => setShowTimeSlots(false)} // Go back to General Admission view
        >
          Update Tickets
        </button>

        <h2>{formattedDate}</h2>

        {/* Time Slots Container with 3 Columns */}
        <div className="time-slots-container">
          {/* Morning Time Slots */}
          <div className="time-slot-column">
            <h3>Morning</h3>
            <div className="time-slot-box">
              <h4>9am</h4>
              <p>Total Price: <strong>${calculateTotalPrice('9am').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
            <div className="time-slot-box">
              <h4>10am</h4>
              <p>Total Price: <strong>${calculateTotalPrice('10am').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
            <div className="time-slot-box">
              <h4>11am</h4>
              <p>Total Price: <strong>${calculateTotalPrice('11am').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
          </div>

          {/* Afternoon Time Slots */}
          <div className="time-slot-column">
            <h3>Afternoon</h3>
            <div className="time-slot-box">
              <h4>12pm</h4>
              <p>Total Price: <strong>${calculateTotalPrice('12pm').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
            <div className="time-slot-box">
              <h4>1pm</h4>
              <p>Total Price: <strong>${calculateTotalPrice('1pm').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
            <div className="time-slot-box">
              <h4>2pm</h4>
              <p>Total Price: <strong>${calculateTotalPrice('2pm').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
          </div>

          {/* Evening Time Slots */}
          <div className="time-slot-column">
            <h3>Evening</h3>
            <div className="time-slot-box">
              <h4>3pm</h4>
              <p>Total Price: <strong>${calculateTotalPrice('3pm').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
            <div className="time-slot-box">
              <h4>4pm</h4>
              <p>Total Price: <strong>${calculateTotalPrice('4pm').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
            </div>
            <div className="time-slot-box">
              <h4>5pm</h4>
              <p>Total Price: <strong>${calculateTotalPrice('5pm').toFixed(2)}</strong></p>
              <p>
                {adultTickets > 0 && `${adultTickets} x Adult, `}
                {childTickets > 0 && `${childTickets} x Child, `}
                {seniorTickets > 0 && `${seniorTickets} x Senior, `}
                {infantTickets > 0 && `${infantTickets} x Infant`}
              </p>
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
