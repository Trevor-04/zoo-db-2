import { useState } from "react";
import React from 'react';
import AnimalCardWrapper from "../components/AnimalCardWrapper"; // Import the AnimalCardWrapper component

function Animals() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIcon = () => {
    setIsOpen(!isOpen);
  }

  // Example data for animals
  const animals = [
    {
      id: 1,
      name: 'Lion',
      description: 'The king of the jungle.',
      imageUrl: '/path-to-lion.jpg',
      dangerLevel: 'high'
    },
    {
      id: 2,
      name: 'Elephant',
      description: 'Largest land animal.',
      imageUrl: '/path-to-elephant.jpg',
      dangerLevel: 'low'
    },
    {
      id: 3,
      name: 'Giraffe',
      description: 'Tallest land animal.',
      imageUrl: '/path-to-giraffe.jpg',
      dangerLevel: 'low'
    },
    // Add more animals here as needed
  ];

  return (
    <main className='flex flex-col items-center justify-start min-h-screen bg-white'>
      {/* Header Section */}
      <div className='w-full text-center text-white font-bold bg-[#165e229e] py-12'>
        <h1 className="relative text-2xl md:text-4xl lg:text-5xl">Our Animals</h1>
      </div>

      {/* Dropdown Button Section */}
      <div className='w-full flex justify-center py-6'>
        <button 
          onClick={toggleIcon} 
          className='flex items-center justify-between h-12 w-64 -mt-[50px] bg-white text-[#165e229e] text-sm 
          font-semibold px-4 py-2 border border-[#165e229e] transition-all duration-300'
        >
          Filter By Exhibit
          <span 
            className={`transform transition-transform duration-300 ${
              isOpen ? 'rotate-45' : 'rotate-0'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </span>
        </button>

        {/* Accordion Dropdown Section */}
        <div className='relative'>
          <div
            className={`flex flex-col mt-2 transition-all duration-500 ease-in-out overflow-hidden absolute right-0 bg-white w-64 border-gray-200 ${
              isOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            {isOpen && (
              <ul className="flex flex-col -mt-4 py-2">
                <li>
                  <button className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors">
                    African Forest
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors">
                    Asian Rainforest
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors">
                    Desert
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors">
                    Aquarium
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors">
                    Birds Exhibit
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Animal Cards Section */}
      <div className="relative -bottom-[150px] px-5 py-5 bg-white justify-center items-center w-full">
        {/* Rendering AnimalCardWrapper here with the animals list */}
        <AnimalCardWrapper animals={animals} />
      </div>
    </main>
  )
}

export default Animals;
