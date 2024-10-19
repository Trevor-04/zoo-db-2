import React from 'react'
import EventCal from '../components/eventCal'


function Events() {
  return (
    
  <div>
    <header className='w-full text-center text-white font-bold bg-[#165e229e] py-12'>
      <h1 className="relative text-2xl md:text-4xl lg:text-5xl">Events</h1>
    </header>
    <div>
      <div className='mt-16'>
        <EventCal />
      </div>
    </div>
  </div>
  )
}

export default Events
