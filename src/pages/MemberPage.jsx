import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MemberPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    // Navigate to the Events page
    const goToEvents = () => {
      navigate('/events');
    };

  return (
    <div>
      <header className="bg-white text-[#165e229e] p-5 flex items-center" ref={dropdownRef}>
        <h1>Member Dashboard</h1>

        <button
          onClick={toggleDropdown}
          className="ml-8 bg-[#165e229e] text-white font-bold w-[100px] h-[30px] rounded-2xl"
        >
          Menu
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <ul className="py-1">
              <li>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  My Profile
                </button>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Ticket History
                </button>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 mt-[20px]">
        <div className="profile-summary text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm">
          My Profile
          {/* Add a profile icon or avatar */}
        </div>

        <div
          className="upcoming-events text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm cursor-pointer"
          onClick={goToEvents}
        >
          Upcoming Events
          {/* Placeholder for events */}
        </div>

        <div className="membership-status text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm">
          Membership Status
          {/* Display membership level */}
        </div>

        <div className="reward-points text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm">
          Reward Points
          {/* Display user's reward points */}
        </div>

        <div className="purchases text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm">
          Recent Purchases
          {/* Display recent purchases */}
        </div>

        <div className="notifications text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm">
          Notifications
          {/* Show recent notifications */}
        </div>
      </div>
    </div>
  );
}
