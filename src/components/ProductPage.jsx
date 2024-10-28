// ProductPage.jsx
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Giftshop.css'; // Import the CSS file

const ProductPage = () => {
  const { name } = useParams(); // Get the product name from the URL parameters
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const { imageUrl, price, descript } = location.state || {}; // Extract imageUrl and price from state

  // Handle the return to the main page
  const handleReturn = () => {
    navigate('/giftshop'); // Navigate back to the main page
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
        <p>{price ? `$${price}` : 'Price not available'}</p>
        <p className="description">{descript}</p>
        
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

export default ProductPage;
