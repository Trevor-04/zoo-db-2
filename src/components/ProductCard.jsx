// ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Giftshop.css'; // Import the CSS file

// ProductCard Component (accepting imageUrl, name, price, and description as props)
const ProductCard = ({ imageUrl, name, price, descript }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(name);
    navigate(`/product/${name}`, { state: { name, imageUrl, price, descript } });
  };

  return (
    <div className="productCard">
      <button onClick={handleClick}>
        Quick View
      </button>
      <figure>
        <img src={imageUrl} alt={name} />
      </figure>
      <div className="cardContent">
        <h2>{name}</h2>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
