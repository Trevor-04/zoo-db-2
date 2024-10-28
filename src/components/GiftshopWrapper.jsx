import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';


// AnimalCardWrapper Component (renders multiple cards)
const GiftshopWrapper = ({gifts = []}) => {
  // Array of animals with their image URLs and names

  const defaultGifts = [
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
    "This is a giraffe shirt. It is very cool. You should buy it." },
    {imageUrl: "/giraffeShirt.webp", name: "Giraffe", price: 12.99, descript:
      "This is a giraffe shirt. It is very cool. You should buy it." }
  ];

  gifts = gifts.length ? gifts : defaultGifts;

  return (
    <div className="bg-white cardBlock flex justify-center flex-wrap w-full">
      {gifts.map((gift, index) => (
        <ProductCard
          key={gift.itemID || index} // Ensure each item has a unique key
          imageUrl={gift.image_url ? gift.image_url :  "/giraffeShirt.webp"}
          name={gift.itemName}
          price={gift.itemPrice}
          descript={gift.descript}
        />
      ))}
    </div>
  );
};

export default GiftshopWrapper;
