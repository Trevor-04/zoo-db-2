import React from 'react';
import GiftCard from './GiftCard';

// AnimalCardWrapper Component (renders multiple cards)
const GiftshopWrapper = () => {
  // Array of animals with their image URLs and names
  const gifts = [
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe"},
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe"},
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe"},
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe"},
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe"},
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe"},
    
    // Add more animals here
  ];

  return (
    
    <div className="bg-white cardBlock flex justify-center flex-wrap w-full">
      
      {gifts.map((gift, index) => (
        <GiftCard key={index} imageUrl={gift.imageUrl} name={gift.name} />
      ))}
    </div>
  );
};

export default GiftshopWrapper;