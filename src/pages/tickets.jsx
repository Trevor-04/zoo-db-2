// import React from 'react'

// function tickets() {
//   return (
//     <div>
//       test test
//     </div>
//   )
// }

// export default tickets
import React from 'react';
import '../components/tickets.css';
import TicketOptions from '../components/ticket';
function Tickets() {
  return (
  
    <div className='flex-1'>
      <header className='w-full text-center text-white font-bold bg-[#165e229e] py-12'>
      <h1 className="relative text-2xl md:text-4xl lg:text-5xl">Buy Tickets</h1>
    </header>
    <TicketOptions /> {/* Here’s where you add the clickable box */}
    </div>
  );
}

export default Tickets;

