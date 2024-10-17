import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./eventCal.css";


const EventCal = ({ isAdmin }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    startHour: '09', 
    startMinute: '00', 
    endHour: '10', 
    endMinute: '00' 
  });

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events'); // Adjust the endpoint based on your backend route
        const eventData = response.data;

        // Convert event data into a date-keyed object for easier lookup
        const eventsByDate = eventData.reduce((acc, event) => {
          const dateString = event.eventDate; // Assuming the eventDate is in 'YYYY-MM-DD' format
          if (!acc[dateString]) {
            acc[dateString] = [];
          }
          acc[dateString].push(event);
          return acc;
        }, {});

        setEvents(eventsByDate);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month with events
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
            >
              <span className="event-title">{event.eventName}</span>
              <span className="event-time">{`${event.startTime} - ${event.endTime}`}</span>
              <div className="event-tooltip">
                <strong>{event.eventName}</strong>
                <br />
                {`${event.startTime} - ${event.endTime}`}
              </div>
            </div>
          ))}
          {isAdmin && ( 
            <button className="add-event-btn" onClick={() => handleAddEventClick(date)}>+</button> )}
        </div>
      );
    }

    return days;
  };

 

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const handleAddEventClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title.trim() !== '') {
      const dateString = selectedDate.toISOString().split('T')[0];
      setEvents(prevEvents => ({
        ...prevEvents,
        [dateString]: [...(prevEvents[dateString] || []), newEvent]
      }));
      setNewEvent({ 
        title: '', 
        startHour: '09', 
        startMinute: '00', 
        endHour: '10', 
        endMinute: '00' 
      });
      setShowEventForm(false);
    }
  };

  return (
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
      {showEventForm && (
        <div className="event-form-overlay">
          <div className="event-form">
            <h4>Add Event for {selectedDate.toDateString()}</h4>
            <form onSubmit={handleAddEvent}>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
              <div className="time-selection">
                <div className="time-group">
                  <label>Start:</label>
                  <select
                    value={newEvent.startHour}
                    onChange={(e) => setNewEvent({ ...newEvent, startHour: e.target.value })}
                  >
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  :
                  <select
                    value={newEvent.startMinute}
                    onChange={(e) => setNewEvent({ ...newEvent, startMinute: e.target.value })}
                  >
                    {['00', '15', '30', '45'].map((minute) => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
                <div className="time-group">
                  <label>End:</label>
                  <select
                    value={newEvent.endHour}
                    onChange={(e) => setNewEvent({ ...newEvent, endHour: e.target.value })}
                  >
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  :
                  <select
                    value={newEvent.endMinute}
                    onChange={(e) => setNewEvent({ ...newEvent, endMinute: e.target.value })}
                  >
                    {['00', '15', '30', '45'].map((minute) => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit">Add Event</button>
              <button type="button" onClick={() => setShowEventForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCal;