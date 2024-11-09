import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const url = "http://localhost:3000";

export default function MemberPage() {
  const [memberData, setMemberData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMembershipStatus, setShowMembershipStatus] = useState(false);
  const [showRewardPoints, setShowRewardPoints] = useState(false);
  const [showRecentPurchases, setShowRecentPurchases] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token); // Log the token
      if (!token) return navigate('/login'); // Redirect to login if no token

      try {
        const response = await axios.get(`${url}/members/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemberData(response.data); // Store the member data
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleMembershipStatus = () => {
    setShowMembershipStatus((prev) => !prev);
  };

  const toggleRewardPoints = () => {
    setShowRewardPoints((prev) => !prev);
  };

  const toggleRecentPurchases = () => {
    setShowRecentPurchases((prev) => !prev);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
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
            className="font-bold text-lg mb-4 text-[#165e229e]"
          >
            <h3 className="font-bold ">My Profile</h3>
          </button>
          {showProfile ? (
            <div>
              <p><strong>Name:</strong> {memberData?.memberFName} {memberData?.memberLName}</p>
              <p><strong>Email:</strong> {memberData?.memberEmail}</p>
              <p><strong>Phone:</strong> {memberData?.memberPhone}</p>
              <p><strong>Birthday:</strong> {memberData?.memberBirthday}</p>
              <p><strong>Membership Type:</strong> {memberData?.memberType}</p>
              <p><strong>Subscribed On:</strong> {memberData?.subscribed_on}</p>
              <p><strong>Membership Term:</strong> {memberData?.memberTerm}</p>
              <p><strong>Last Billed:</strong> {memberData?.last_billed}</p>
            </div>
          ) : (
            <p>Click "My Profile" to view your details.</p>
          )}
        </div>

        <div
          className="upcoming-events text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={goToEvents}
        >
          <h3 className="font-bold">Upcoming events</h3>
        </div>

        <div 
          className="membership-status text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={toggleMembershipStatus}
        >
          <h3 className="font-bold">Membership Status</h3>
          {showMembershipStatus && (
            <div className="mt-2">
              <p><strong>Type:</strong> {memberData?.memberType}</p>
              <p><strong>Term:</strong> {memberData?.memberTerm}</p>
              <p><strong>Subscribed On:</strong> {memberData?.subscribed_on}</p>
              <p><strong>Last Billed:</strong> {memberData?.last_billed}</p>
            </div>
          )}
        </div>

        <div 
          className="reward-points text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={toggleRewardPoints}
        >
          <h3 className="font-bold">Reward Points</h3>
          {showRewardPoints && (
            <div className="mt-2">
              <p><strong>Current Points:</strong> 150</p>
              <p><strong>Status:</strong> Active</p>
            </div>
          )}
        </div>

        <div 
          className="purchases text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={toggleRecentPurchases}
        >
          <h3 className="font-bold">Recent Purchases</h3>
          {showRecentPurchases && (
            <div className="mt-2">
              <ul className="list-disc list-inside">
                <li>Item 1 - $10.00 (January 1, 2024)</li>
                <li>Item 2 - $5.00 (December 25, 2023)</li>
                <li>Item 3 - $20.00 (November 15, 2023)</li>
              </ul>
            </div>
          )}
        </div>

        <div 
          className="notifications text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={toggleNotifications}
        >
          <h3 className="font-bold">Notifications</h3>
          {showNotifications && (
            <div className="mt-2">
              <ul className="list-disc list-inside">
                <li>Reminder: Membership renewal on January 1, 2024</li>
                <li>New events available for members!</li>
                <li>Check out our new exhibits this month!</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
