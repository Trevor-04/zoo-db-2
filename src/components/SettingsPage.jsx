import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const {url} = require('../config.json')[process.env.NODE_ENV];  

export default function SettingsPage() {
  const [memberData, setMemberData] = useState(null);
  const [editData, setEditData] = useState({});
  const { memberId } = useParams(); // Get memberId from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const response = await axios.get(`${url}/members/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMemberData(response.data);
        setEditData(response.data);  // Initialize with current data
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [navigate]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editData.memberBirthday) {
        editData.memberBirthday = new Date(editData.memberBirthday).toISOString().split('T')[0];
      }  
      await axios.put(`${url}/members/update`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Changes saved successfully');
      navigate(`/member/${memberId}`); // Redirect back to MemberPage with dynamic memberId
    } catch (error) {
      console.error("Error updating member data:", error);
      alert('Failed to save changes');
    }
  };

  if (!memberData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2>Edit info</h2>
      <div>
        <label>Name:</label>
        <input name="memberFName" value={editData.memberFName} onChange={handleChange} />
        <input name="memberLName" value={editData.memberLName} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input name="memberEmail" value={editData.memberEmail} onChange={handleChange} />
      </div>
      <div>
        <label>Phone:</label>
        <input name="memberPhone" value={editData.memberPhone} onChange={handleChange} />
      </div>
      {/* Add more fields as needed */}
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}
