import React from 'react';

// AnimalCard Component (accepting image and name as props)
const AnimalCard = ({ imageUrl, name }) => {
  return (
  <div className="card cursor-pointer bg-gray-100 shadow-lg w-full max-w-xs p-4 m-4 relative"> {/* Apply background color here */}
    <figure className="scale-100 h-48 hover:scale-95"> 
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </figure>
      <div className="cardContent ep-4">
        <h2 className="text-xl font-bold text-[#165e229e] hover:text-[#2490369e]">{name}</h2>
      </div>
  </div>
  );
};

export default AnimalCard;
