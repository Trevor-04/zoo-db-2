import React from "react";
import { Link } from "react-router-dom"; // Make sure this is correct

export default function Navbar() {
  return (
    <header className="bg-[#faf0e6] h-20 flex justify-end">
      <div>
        <Link to="/attractions">
          <button className="text-[#165e229e] hover:text-green-900 ml-7 mt-4 p-1">
            Attractions
          </button>
        </Link>

        <Link to="/giftshop">
          <button className="text-[#165e229e] hover:text-green-900 ml-7 mt-4 p-1">
            Gift shop
          </button>
        </Link>

        <Link to="/animals">
          <button className="text-[#165e229e] hover:text-green-900 ml-7 mt-4 p-1">
            Animals
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-[#165e229e] text-white hover:bg-green-900 mt-4 ml-7 mr-6 p-1">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}
