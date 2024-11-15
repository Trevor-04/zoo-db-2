// ProductPage.jsx
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Giftshop.css'; // Import the CSS file

const AnimalPage = () => {
  const { name } = useParams(); // Get the product name from the URL parameters
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const { imageUrl, species, birthday } = location.state || {}; // Extract imageUrl and price from state

  // Format birthday if it's a valid date
  const formattedBirthday = birthday ? new Date(birthday).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  // Handle the return to the main page
  const handleReturn = () => {
    navigate('/animals'); // Navigate back to the main page
  };

  return (
    <div className="productPage">
      {/* Product Image */}
      <div className="productImage">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/default-product.png"; // Fallback image
            }}
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>

      {/* Product Details */}
      <div className="productDetails">
        <h1>{name}</h1>
        <p className="species"><i>{species}</i></p>
        <p className="birthday">Birthday: {formattedBirthday}</p>
        
        {/* Return Button */}
        <button 
          onClick={handleReturn} 
          className="returnButton"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default AnimalPage;
