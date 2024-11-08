import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//const { url } = require('../config.json');
const { url } = require('../config.json')[process.env.NODE_ENV || 'development']; // This ensures the correct environment is selected

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${url}/login/validate`, {
        email: username,
        password: password,
        loginType: 'employee',
      });

      if (response.status === 200) {
        const { role } = response.data;
        console.log(role); // Assuming you get role in the response
        if (role === 'admin') {
          navigate('/Admin'); // Redirect to admin dashboard
        }
        if (role === 'employee') {
            navigate('/Admin'); // Redirect to admin dashboard
        }
        else {
          navigate('/Admin'); // Redirect to member dashboard or another route
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert("Invalid Username and Password");
      } else {
        console.error(e);
      }
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#165e229e] ">
      <div className="bg-white rounded-lg shadow-lg px-24 py-28">
        <h1 className=" text-[#333] font-bold text-xl text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="flex-col items-center ">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border border-[#165e229e] rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password" // Change to password for security
            placeholder="Password"
            className="w-full p-2 mb-4 border border-[#165e229e] rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center justify-center bg-[#165e229e] hover:bg-green-800 px-4 py-2 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;
