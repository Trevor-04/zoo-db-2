import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className="flex items-center justify-center h-screen bg-[#165e229e] ">
      <div className="bg-white rounded-lg shadow-lg px-24 py-28">
        <h1 className=" text-[#333] font-bold text-xl text-center"> 
        Login</h1>

        <form className="flex-col items-center ">
          <input 
              type="text" 
              placeholder="Username"
              className="w-full p-2 mb-4 border border-[#165e229e] rounded"
          />

          <input 
              type="text" 
              placeholder="Password"
              className="w-full p-2 mb-4 border border-[#165e229e] rounded"
          />

        <button className="flex items-center justify-center bg-[#165e229e]
         hover:bg-green-800 px-4 py-2 w-full">
          Login
        </button>

        <div className="flex items-center justify-center mt-4 mb-2">
          <div className="border-t border-[#165e229e] flex-grow"></div>
          <p className="px-2 text-[#333]">Don't have an account?</p>
          <div className="border-t border-[#165e229e] flex-grow"></div>
        </div>

        <Link to="/signup">
          <button className="flex items-center justify-center bg-[#165e229e]
          hover:bg-green-800 px-4 py-2 w-full">
            Sign Up
          </button>
        </Link>

        </form>
      </div>
    </main>
  );
}


export default Login
