import React from 'react';
import './tickets.css'; // Assuming you will style the box here
import { Link } from 'react-router-dom';

function TicketOptions() {
  return (
    <div className="ticket-options">
      <ul className="ticket-list">
        <li className="ticket-item">
          <a href="/general-admission" className="ticket-link">General Admission</a>
        </li>
        <li className="ticket-item">
          <a href="/discounted-tickets" className="ticket-link">Discounted Tickets</a>
        </li>
        <li className="ticket-item">
          {/*<a href="/membership-portal" className="ticket-link">Membership Portal</a> */}
          <Link to="/Signup" className="ticket-link">Membership Portal</Link>
        </li>
      </ul>
    </div>
  );
}

export default TicketOptions;
