import React, { useState } from 'react';
import './tickets.css';
import { Link } from 'react-router-dom';

function TicketOptions() {
  // State to manage the currently visible section
  const [visibleSection, setVisibleSection] = useState('generalAdmission'); // Default is 'generalAdmission'

  // General Admission Ticket section (default view)
  const GeneralAdmission = () => (
    <div className="general-admission">
      <h2>General Admission</h2>
      <div className="ticket-categories">
        <div className="ticket-category">
          <label>Adult (Ages 13-64)</label>
          <input type="number" min="0" defaultValue="0" />
        </div>
        <div className="ticket-category">
          <label>Child (Ages 3-12)</label>
          <input type="number" min="0" defaultValue="0" />
        </div>
        <div className="ticket-category">
          <label>Senior (65+)</label>
          <input type="number" min="0" defaultValue="0" />
        </div>
        <div className="ticket-category">
          <label>Infant (2 & Under)</label>
          <input type="number" min="0" defaultValue="0" />
        </div>
        <div className="ticket-date">
          <label><strong>When?</strong></label>
          <input type="date" />
        </div>
        <button className="continue-button">Continue</button>
      </div>
    </div>
  );

  // Rendering the buttons and sections
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
        {visibleSection === 'generalAdmission' && <GeneralAdmission />}
      </div>
    </div>
  );
}

export default TicketOptions;
