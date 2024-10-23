import React from 'react';

// GiftCard Component (accepting image and name as props)
const ProductCard = ({ imageUrl, name, price }) => { // what happens when you click on the card
    const handleClick = () =>{
       console.log(name)
    };
  return (
    <div className="relative w-[250px] card cursor-pointer bg-gray-300 shadow-lg max-w-xs p-4 m-4 transition-colors duration-200"> {/* Apply background color here */}
      <button onClick={handleClick} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 
      -translate-y-1/2 opacity-0 hover:opacity-100  flex 
      justify-center items-center text-white p-3 font-bold 
       hover:border-black hover:bg-white rounded hover:bg-opacity-75 hover:text-black'>
        Quick View
      </button> 
      <figure className="w-full"> 
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </figure>
      <div className="cardContent ep-4">
        <h2 className="text-xl font-bold text-black">{name}</h2>
        <h3 className="text-xl font text-black">${price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;