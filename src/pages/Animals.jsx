import { useState } from "react";
import React from 'react';
import Accordion from "../components/Accordion";
import AnimalCardWrapper from "../components/AnimalCardWrapper"; // Import the AnimalCardWrapper component

function Animals() {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleIcon = () => {
  //   setIsOpen(!isOpen);
  // }

  // Example data for animals
  const animals = [
    // {
    //   id: 1,
    //   name: 'Lion',
    //   description: 'The king of the jungle.',
    //   imageUrl: '/path-to-lion.jpg',
    //   dangerLevel: 'high'
    // },
    // {
    //   id: 2,
    //   name: 'Elephant',
    //   description: 'Largest land animal.',
    //   imageUrl: '/path-to-elephant.jpg',
    //   dangerLevel: 'low'
    // },
    // {
    //   id: 3,
    //   name: 'Giraffe',
    //   description: 'Tallest land animal.',
    //   imageUrl: '/path-to-giraffe.jpg',
    //   dangerLevel: 'low'
    // },
    // Add more animals here as needed
  ];

  return (
    <main className='flex flex-col items-center justify-start min-h-screen bg-white'>
      {/* Header Section */}
      <div className='w-full text-center text-white font-bold bg-[#165e229e] py-12'>
        <h1 className="relative text-2xl md:text-4xl lg:text-5xl">Our Animals</h1>
      </div>

      {/* Dropdown Button Section */}
      
      <Accordion/>

        {/* Accordion Dropdown Section */}
       

      {/* Animal Cards Section */}
      <div className="relative -bottom-[0px] px-5 py-5 bg-white justify-center items-center w-full">
        {/* Rendering AnimalCardWrapper here with the animals list */}
      </div>

    </main>
  )
}

export default Animals;
