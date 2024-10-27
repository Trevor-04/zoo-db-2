import React from 'react';
import ProductCard from './ProductCard';

// AnimalCardWrapper Component (renders multiple cards)
const GiftshopWrapper = () => {
  // Array of animals with their image URLs and names

  

  const gifts = [
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
    "This is a giraffe shirt. It is very cool. You should buy it." },
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
      "This is a giraffe shirt. It is very cool. You should buy it." },
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
      "This is a giraffe shirt. It is very cool. You should buy it." },
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
      "This is a giraffe shirt. It is very cool. You should buy it." },
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
      "This is a giraffe shirt. It is very cool. You should buy it." },
    
    // Add more animals here
  ];

  return (
    
    <div className="bg-white cardBlock flex justify-center flex-wrap w-full">
      
      {gifts.map((gift, index) => (
        <ProductCard key={index} imageUrl={gift.imageUrl} name={gift.name} price={gift.price} descript={gift.descript}/>
      ))}
    </div>
  );
};

export default GiftshopWrapper;