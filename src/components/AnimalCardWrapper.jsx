import React from 'react';
import GiftCard from './GiftCard';

// AnimalCardWrapper Component (renders multiple cards)
const AnimalCardWrapper = () => {
  // Array of animals with their image URLs and names
  const animals = [
    { imageUrl: "/cougar.jpeg", name: "Cougar" },
    { imageUrl: "/cougar.jpeg", name: "Cougar" },
    { imageUrl: "/cougar.jpeg", name: "Cougar" },
    { imageUrl: "/cougar.jpeg", name: "Cougar" },
    { imageUrl: "/cougar.jpeg", name: "Cougar" },
    { imageUrl: "/cougar.jpeg", name: "Cougar" },

    
    // Add more animals here
  ];

  return (
    <div className="bg-white cardBlock -mt-[150px] flex justify-center flex-wrap w-full">
      {animals.map((animal, index) => (
        <GiftCard key={index} imageUrl={animal.imageUrl} name={animal.name} />
      ))}
    </div>
  );
};

export default AnimalCardWrapper;
