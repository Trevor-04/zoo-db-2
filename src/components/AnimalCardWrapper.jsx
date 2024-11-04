import React from 'react';
import GiftCard from './GiftCard';

// AnimalCardWrapper Component (renders multiple cards)
const AnimalCardWrapper = ({selectedExhibit = []}) => {
  // Array of animals with their image URLs and names

  
  const defaultAnimals = [
    { imageUrl: "/cougar.jpeg", name: "Cougar" },
    // Add more animals here
  ];

  const displayAnimals = selectedExhibit.length > 0 ? selectedExhibit : defaultAnimals;

  return (
    <div className="bg-white cardBlock -mt-[0px] flex justify-center flex-wrap w-full">
      
      {displayAnimals.map((animal, index) => (
        <GiftCard key = {index} 
          imageUrl={animal.imageUrl || "/cougar.jpeg"} 
          name={animal.name}/>
        ))
      }
    </div>
  );
};

export default AnimalCardWrapper;

