import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MemberPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

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
      <div className="profile-summary text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm ">
          <button
            onClick={toggleProfile}
            className="font-bold text-lg mb-4 text-[#165e229e] underline"
          >
            My Profile
          </button>
          {showProfile ? ( // Display profile details if showProfile is true
            <div>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
              <p><strong>Birthday:</strong> January 1, 1990</p>
              <p><strong>Membership Type:</strong> Gold</p>
              <p><strong>Subscribed On:</strong> January 1, 2020</p>
              <p><strong>Membership Term:</strong> Annual</p>
              <p><strong>Last Billed:</strong> January 1, 2024</p>
            </div>
          ) : (
            <p>Click "My Profile" to view your details.</p>
          )}
        </div>

        <div
          className="upcoming-events text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={goToEvents}
        >
          Upcoming Events
        </div>

        <div className="membership-status text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center">
          Membership Status
        </div>

        <div className="reward-points text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center">
          Reward Points
        </div>

        <div className="purchases text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center">
          Recent Purchases
        </div>

        <div className="notifications text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center">
          Notifications
        </div>
      </div>
    </div>
  );
}
