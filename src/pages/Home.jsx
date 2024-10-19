import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from 'react-router-dom';
import EventCal from '../components/eventCal';

const Home = () => {
  return (
    <div>
      <header>
        <Carousel showThumbs={false}>
          
          <div className="relative h-[400px] w-full overflow-clip">
            <img src="cougar.jpeg" alt="Cougar" />
            <p className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2">Legend 1</p>
          </div>
          <div className="relativeh h-[400px] w-full overflow-clip">
            <img src="cougar.jpeg" alt="Another" />
            <p className="absolute justify-center items-center bg-black bg-opacity-50 text-white p-2">Legend 2</p>
          </div>
        </Carousel>
      </header>

       {/* Add more images here */}

     
     {/* //membership singup */}
      <section className='overflow-y-scroll relative mt-20'>
          <div className='text-bold text-white bg-[#faf0e6] h-[200px] m-4 p-6 relative'>
              <p className='font-bold text-2xl text-[#165e229e]'>Become a member</p>
              <p className='font-bold text-lg text-[#165e229e]'>
                Your Membership pays for itself in as few as two visits per year
              </p>

              <Link to="/Signup">
                <button className='absolute bg-[#165e229e] rounded-xl hover:bg-green-900
                  text-white font-bold w-[200px] p-2 bottom-4 right-4'>
                  Discover Benefits
                </button>
              </Link>
          </div>
       </section>

    {/*Donate link possibly a joke*/}
    <Link > 
      <section className='overflow-y-scroll relative '>
        <div className='text-bold text-white  bg-[#faf0e6] h-[200px] m-4 p-6 relative'>
        <p className='font-bold text-2xl text-[#165e229e]'>Donate Today</p>
        <p className='font-bold text-sm text-[#165e229e]'>You play a crucial role in the success of the Houston Zoo's education and animal care programs, global field projects, and local conservation initiatives through your donations.</p>
        <button className='absolute bg-[#165e229e] rounded-xl hover:bg-green-900 text-white font-bold w-[200px] p-2 bottom-4 right-4'>
                Donate Today
        </button>
        </div>
      </section>
     </Link>

      <div className=''>
      <EventCal/>
      </div>
    

    </div>
  );
}

export default Home;