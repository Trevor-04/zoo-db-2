import React from 'react';
import './tickets.css'; // Assuming you will style the box here

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
          <a href="/membership-portal" className="ticket-link">Membership Portal</a>
        </li>
      </ul>
    </div>
  );
}

export default TicketOptions;
