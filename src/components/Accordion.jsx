import React, { useEffect } from 'react'
import {useState} from 'react';
import axios from 'axios';
import Config from '../config.json';
import AnimalCardWrapper from './AnimalCardWrapper';

const {url} = Config; 

function Accordion() {
    const [AccordionOpen, setAccordionOpen] = useState(null);
    const [exhibits, setExhibits] = useState([]);
    const [selectedExhibit, setSelectedExhibit] = useState([])


    const getExhibits = async (exhibit) => {
      let response;
      if(exhibit) { 
        if (!isNaN(exhibit)) { // is numeric
          response = await axios.get(`${url}/exhibits/${exhibit}`);
        } else { // name 
          response = await axios.get(`${url}/exhibits/name/${exhibit}`);
        }
      } else { // gets a list of all exhibits
          response = await axios.get(`${url}/exhibits/`);
      }
      if(response && response.data) {
        setExhibits(response.data);
      }
      
    }

    const getSelectedAnimals = async function(exhibitName) {
      let response;
      response = await axios.get(`${url}/animals/exhibits/${exhibitName}`)

      if(response && response.data) {
        setSelectedExhibit(response.data || []);
      }
    }

    useEffect(() => {
      getSelectedAnimals("all");
      getExhibits();
    }, [])

  return (
    
    <div className=''>
      <div className = 'flex flex-col justify-center items-center'>
    {/* Accordion Dropdown Section */}
    <button onClick={() => setAccordionOpen(!AccordionOpen)}  
      className='flex items-center justify-between h-12 w-64 -mt-[25px] bg-white text-[#165e229e] text-sm 
      font-semibold px-4 py-2 border border-[#165e229e]
      transition-all duration-300'>
        <span>Filter by exhibit</span>
       
        <span 
            className={`transform transition-transform duration-300 ${
              AccordionOpen ? 'rotate-45' : 'rotate-0'
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
      </div>
      <div className={`aboslute top-full flex justify-center grid overflow-hidden transition-all duration-300 ease-in-outborder ${
            AccordionOpen 
            ? 'grid-rows-[1fr] opacity-100' 
            : 'grid-rows-[0fr] opacity-0'
            }`}>

            { <div
            className={`flex flex-col mt-2 transition-all duration-500 ease-in-out overflow-hidden relative bg-white w-64 border-gray-200 ${
              AccordionOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            {AccordionOpen && (
              <ul className="relative flex flex-col -mt-4 py-2 overflow-y-scroll">
                <li>
                  <button className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors"
                  onClick={() => getSelectedAnimals("all")}>
                    All
                  </button>
                </li>

                {exhibits.map((exhibits) => (
                  <li key = {exhibits.exhibitID}>
                    <button 
                    className="w-full px-4 py-3 text-left border hover:bg-gray-100 transition-colors"
                    onClick={() => getSelectedAnimals(exhibits.exhibitName)}
                    > 
                {exhibits.exhibitName}
                </button>
              </li>
                ))}
              
              </ul>
            )}
          </div>  }
      </div>
      <AnimalCardWrapper selectedExhibit={selectedExhibit}/>
    </div>
  );
}

export default Accordion
