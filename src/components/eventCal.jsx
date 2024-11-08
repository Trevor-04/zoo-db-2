import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./eventCal.css";

const {url} = require("../config.json")[process.env.NODE_ENV];

const EventCal = ({ isAdmin }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  //event display
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  //add events
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newMembersOnly, setNewMembersOnly] = useState('');
  const [newExhibitID, setNewExhibitID] = useState('');
  const [newSponsorID, setNewSponsorID] = useState('');
  const [newEventID, setNewEventID] = useState('');


  // Fetch events from database
async function getAllEvents() {
  await axios.get(`${url}/events/`)
  .then(response => {
    const eventsByDate = {};
    response.data.forEach(event => {
      const eventDate = new Date(event.eventTime).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      if (!eventsByDate[eventDate]) {
        eventsByDate[eventDate] = [];
      }
      eventsByDate[eventDate].push(event);
    });
    setEvents(eventsByDate); // Save events data in state
  })
  .catch(error => {
    console.error("There was an error fetching the events!", error);
  });
}

  useEffect(() => {
    getAllEvents();
  }, []);
  
  // adding events
  const handleAddEvent = async (e) => {
    e.preventDefault();
  
    const newEvent = {
      eventName: newEventName || null,
      eventTime: newEventDate || null, // Assuming eventDate is stored as a date
      members_only: newMembersOnly === true,
      exhibitID: newExhibitID || null,
      sponsorID: newSponsorID || null
    };
    try {
      await axios.post(`${url}/events/add/`, newEvent);
      // Reset form and close modal
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
  
  // deleting events
  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${url}/events/${selectedEvent.eventID}`);
      alert('Event deleted successfully!');
      setIsModalOpen(false);
      getAllEvents();
    } catch (error) {
      console.error("Error deleting event", error);
      alert('Failed to delete event.');
    }
  };

  // Calender stuff
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
              {/* <span className="event-time">{`${event.startTime} - ${event.endTime}`}</span> */}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  // more detailed view of events
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
      <div className="button-container">
        <button className="side-button add-event-button" onClick={openAddEventModal}>Add Event</button>
      </div>

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

      {/* Event Details */}
      {isModalOpen && selectedEvent && (
        <div className="event-modal">
          <div className="modal-content">
            <h3>{selectedEvent.eventName}</h3>
            <p><strong>Event Time:</strong> {new Date(selectedEvent.eventTime).toLocaleDateString('en-US', {year: '2-digit', month: '2-digit', day: '2-digit'})}</p>
            <p><strong>Members Only:</strong> {selectedEvent.members_only ? 'Yes' : 'No'}</p>
            <p><strong>Exhibit ID:</strong> {selectedEvent.exhibitID}</p>
            <p><strong>Sponsor ID:</strong> {selectedEvent.sponsorID}</p>
            <p><strong>Event ID:</strong> {selectedEvent.eventID}</p>
            <button onClick={handleDeleteEvent} className="delete-button">Delete Event</button>
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Adding Event */}
      {isAddModalOpen && (
        <div className="event-modal">
          <div className="modal-content">
            <h3>Add a New Event</h3>
            <form onSubmit={handleAddEvent}>

              <div className="form-group">
                <label>Event Name:</label>
                <input
                  type="text"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Event Date:</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Members Only:</label>
                <select
                  value={newMembersOnly}
                  onChange={(e) => setNewMembersOnly(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Exhibit ID:</label>
                <input
                  type="text"
                  value={newExhibitID}
                  onChange={(e) => setNewExhibitID(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Sponsor ID:</label>
                <input
                  type="text"
                  value={newSponsorID}
                  onChange={(e) => setNewSponsorID(e.target.value)}
                  required
                />
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
