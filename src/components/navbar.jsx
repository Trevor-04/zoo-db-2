import React from "react";
import { Link } from "react-router-dom"; // Make sure this is correct

export default function Navbar() {
  return (
    <header className="bg-[#faf0e6] h-20 flex justify-end">
      <div>
        <Link to="/Events">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-7 mt-4 p-1">
            Events
          </button>
        </Link>

        <Link to="/giftshop">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-7 mt-4 p-1">
            Gift shop
          </button>
        </Link>

        <Link to="/animals">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-7 mt-4 p-1">
            Animals
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-[#165e229e] rounded font-bold text-white hover:bg-green-900 mt-4 ml-7 mr-6 pl-2 pr-2 h-[35px]">
            Log in
          </button>
        </Link>
      </div>
    </header>
  );
}
