import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const { url } = require('../config.json');

const GiftshopWrapper = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    // Fetch data from your API when the component mounts
    const listItems = async () => {
      try {
        const response = await axios.get(`${url}/inventory/category/3`);
        // Extract data from the response
        const fetchedGifts = response.data;
        setGifts(fetchedGifts); // Save the fetched data in state
      } catch (error) {
        console.error('There was an error fetching the gifts!', error);
      }
    };

    listItems();
  }, []);

  return (
    <div className="bg-white cardBlock flex justify-center flex-wrap w-full">
      {gifts.map((gift, index) => (
        <ProductCard
          key={gift.itemID || index} // Ensure each item has a unique key
          imageUrl={gift.image_url}
          name={gift.itemName}
          price={gift.itemPrice}
          descript={gift.descript}
        />
      ))}
    </div>
  );
};

export default GiftshopWrapper;
