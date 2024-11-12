import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import "./eventCal.css";

const { url } = require("../config.json")[process.env.NODE_ENV];

const EventCal = () => {
  const [role, setRole] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newMembersOnly, setNewMembersOnly] = useState('');
  const [newExhibitID, setNewExhibitID] = useState('');
  const [newSponsorID, setNewSponsorID] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const location = useLocation();
  // Retrieve role from token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Retrieved Token:", token); // Log the token itself

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Log the entire decoded token
        setRole(decodedToken.role); // Set role from the token
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  console.log("Role:", role); // Check if the role is being set correctly
  // Function to toggle edit mode
const toggleEditMode = () => {
  setIsEditMode((prevMode) => !prevMode);
};
useEffect(() => {
  if (location.state && location.state.editMode) {
    setIsEditMode(location.state.editMode);
  }
}, [location.state]);
  // Fetch events from the backend
  async function getAllEvents() {
    try {
      const response = await axios.get(`${url}/events/`);
      const eventsByDate = {};
      response.data.forEach(event => {
        const eventDate = new Date(event.eventTime).toISOString().split('T')[0];
        if (!eventsByDate[eventDate]) {
          eventsByDate[eventDate] = [];
        }
        eventsByDate[eventDate].push(event);
      });
      setEvents(eventsByDate);
    } catch (error) {
      console.error("There was an error fetching the events!", error);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  // Add event function
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const newEvent = {
      eventName: newEventName || null,
      eventTime: newEventDate || null,
      members_only: newMembersOnly === 'true',
      exhibitID: newExhibitID || null,
      sponsorID: newSponsorID || null
    };

    try {
      await axios.post(`${url}/events/add/`, newEvent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewEventName('');
      setNewEventDate('');
      setNewMembersOnly('');
      setNewExhibitID('');
      setNewSponsorID('');
      closeAddEventModal();
      getAllEvents();
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

  // Delete event function
  const handleDeleteEvent = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`${url}/events/${selectedEvent.eventID}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event deleted successfully!');
      setIsModalOpen(false);
      getAllEvents();
    } catch (error) {
      console.error("Error deleting event", error);
      alert('Failed to delete event.');
    }
  };

  // Calendar helper functions
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events[dateString] || [];

      days.push(
        <div key={day} className="calendar-day">
          <span className="day-number">{day}</span>
          {dayEvents.map((event, index) => (
            <div
              key={`${dateString}-${event.eventName}-${index}`}
              className="event-item"
              onClick={() => {
                setSelectedEvent(event);
                setIsModalOpen(true);
              }}
            >
              <span className="event-title">{event.eventName}</span>
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const openAddEventModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddEventModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="calendar-page">
      {role === 'employee' && isEditMode && (
        <div className="button-container">
          <button className="side-button add-event-button" onClick={openAddEventModal}>Add Event</button>
        </div>
      )}

      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>❮</button>
          <h2>Event Calendar</h2>
          <button onClick={() => changeMonth(1)}>❯</button>
        </div>
        <div className="calendar-subheader">
          <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day-header">Sun</div>
          <div className="calendar-day-header">Mon</div>
          <div className="calendar-day-header">Tue</div>
          <div className="calendar-day-header">Wed</div>
          <div className="calendar-day-header">Thu</div>
          <div className="calendar-day-header">Fri</div>
          <div className="calendar-day-header">Sat</div>
          {renderCalendarDays()}
        </div>
      </div>

      {isModalOpen && selectedEvent && (
        <div className="event-modal">
          <div className="modal-content">
            <h3>{selectedEvent.eventName}</h3>
            <p><strong>Event Time:</strong> {new Date(selectedEvent.eventTime).toLocaleDateString('en-US', {year: '2-digit', month: '2-digit', day: '2-digit'})}</p>
            <p><strong>Members Only:</strong> {selectedEvent.members_only ? 'Yes' : 'No'}</p>
            <p><strong>Exhibit ID:</strong> {selectedEvent.exhibitID}</p>
            <p><strong>Sponsor ID:</strong> {selectedEvent.sponsorID}</p>
            <p><strong>Event ID:</strong> {selectedEvent.eventID}</p>
            {role === 'employee' && <button onClick={handleDeleteEvent} className="delete-button">Delete Event</button>}
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="event-modal">
          <div className="modal-content">
            <h3>Add a New Event</h3>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label>Event Name:</label>
                <input type="text" value={newEventName} onChange={(e) => setNewEventName(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Event Date:</label>
                <input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Members Only:</label>
                <select value={newMembersOnly} onChange={(e) => setNewMembersOnly(e.target.value)} required>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Exhibit ID:</label>
                <input type="text" value={newExhibitID} onChange={(e) => setNewExhibitID(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Sponsor ID:</label>
                <input type="text" value={newSponsorID} onChange={(e) => setNewSponsorID(e.target.value)} required />
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-button">Submit</button>
                <button type="button" onClick={closeAddEventModal} className="close-button">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCal;


