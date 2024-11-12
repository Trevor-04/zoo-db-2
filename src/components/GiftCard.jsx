import React from 'react';

// GiftCard Component (accepting imageUrl and name as props)
const GiftCard = ({ imageUrl, name }) => {
  // Define what happens when you click on the card
  const handleClick = () => {
    console.log(name);
  };

  return (
    <div className="relative w-[250px] h-[350px] card cursor-pointer bg-gray-300 shadow-lg max-w-s p-4 m-4 transition-colors duration-200">
      <figure className="w-full h-[270px]"> {/* Set height to ensure consistent image size */}
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </figure>
      <div className="cardContent mt-4">
        <h2 className="text-xl font-bold text-black">{name}</h2>
      </div>
    </div>
  );
};

export default GiftCard;
