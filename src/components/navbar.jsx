import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if a token exists
  // Decode token to extract the ID
  const getIDFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
      return payload.ID; // Extract ID
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const employeeID = getIDFromToken();
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  if (location.pathname.startsWith('/member')) {
    return null;
  }

  return (
    <header className="bg-[#faf0e6] h-20 flex items-center justify-between px-4">
      {/* Logo Section */}
      {employeeID ? (
          <button
            onClick={() =>
              navigate(`/Admin/${employeeID}`)
            }
            className="flex items-center"
          >
            <img className="h-[70px]" src="/Coog_Zoo.png" alt="logo" />
          </button>
        ) : (
      <Link to="/" className="flex items-center">
        <img className="h-[70px]" src="/Coog_Zoo.png" alt="logo" />
      </Link>
      )}
      {/* Buttons Section */}
      <div className="flex items-center">
      {employeeID ? (
          <button
            onClick={() =>
              navigate(`/Admin/${employeeID}/events`, { state: { editMode: true } })
            }
            className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1"
          >
            Edit Upcoming Events
          </button>
        ) : (
          <Link to="/Events">
            <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
              Upcoming Events
            </button>
          </Link>
        )}

        {employeeID ? (
          <button
            onClick={() =>
              navigate(`/Admin/${employeeID}/tickets`)
            }
            className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1"
          >
            Tickets
          </button>
        ) : (
        <Link to="/tickets">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
            Tickets
          </button>
        </Link>
        )}

        {employeeID ? (
          <button
            onClick={() =>
              navigate(`/Admin/${employeeID}/giftshop`)
            }
            className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1"
          >
            Merchandise
          </button>
        ) : (
        <Link to="/giftshop">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
            Merchandise
          </button>
        </Link>
        )}
        {employeeID ? (
          <button
            onClick={() =>
              navigate(`/Admin/${employeeID}/animals`)
            }
            className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1"
          >
            Animals
          </button>
        ) : (
        <Link to="/animals">
          <button className="text-[#165e229e] font-bold hover:text-green-900 ml-4 p-1">
            Animals
          </button>
        </Link>
        )}

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[#165e229e] rounded font-bold text-white hover:bg-green-900 ml-4 pl-2 pr-2 h-[35px]"
          >
            Log out
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-[#165e229e] rounded font-bold text-white hover:bg-green-900 ml-4 pl-2 pr-2 h-[35px]">
              Log in
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
