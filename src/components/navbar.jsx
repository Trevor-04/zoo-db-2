import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-[#faf0e6] h-20 flex items-center justify-between px-4">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img className="h-[70px]" src="Coog_Zoo.png" alt="logo" />
      </Link>

      {/* Buttons Section */}
      <div className="flex items-center">
        <Link to="/Events">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
<<<<<<< HEAD
            Events
=======
            Upcoming Events
          </button>
        </Link>

        <Link to="/tickets">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
            Tickets
>>>>>>> 0e45ec9c651f1255804ab6e367f7c6a3488b96e5
          </button>
        </Link>

        <Link to="/giftshop">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
            Gift shop
          </button>
        </Link>

        <Link to="/animals">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
            Animals
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-[#165e229e] rounded font-bold text-white hover:bg-green-900 ml-4 pl-2 pr-2 h-[35px]">
            Log in
          </button>
        </Link>
      </div>
      <div> 
        test test
      </div>
    </header>
  );
}
