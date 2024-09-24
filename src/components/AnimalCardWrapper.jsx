import React from 'react';

// AnimalCard Component (with placeholders for now)
const AnimalCard = () => {
  return (
    <div className="card cursor-pointer bg-[#e0d3c2] shadow-lg w-full max-w-xs p-4 m-4 relative">
      <figure className="w-full h-48 bg-white">
        {/* Placeholder image */}
      </figure>
      <div className="cardContent p-4">
        <h2 className="text-xl font-bold text-[#165e229e] hover:text-[#2490369e]">Animal Name</h2>
        {/* Placeholder for any additional content */}
      </div>
    </div>
  );
};

// AnimalCardWrapper Component (renders multiple cards)
const AnimalCardWrapper = () => {
  // Placeholder array for card rendering
  const placeholderCards = new Array(4).fill(0);

  return (
    <div className=" bg-[#e0d3c2] cardBlock mt-4 flex justify-center flex-wrap w-full">
      {placeholderCards.map((_, index) => (
        <AnimalCard key={index} />
      ))}
    </div>
  );
};

export default AnimalCardWrapper;
