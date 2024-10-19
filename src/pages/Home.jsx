import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import EventCal from '../components/eventCal';
=======
>>>>>>> 0e45ec9c651f1255804ab6e367f7c6a3488b96e5

const Home = () => {
  return (
    <div>
      <header>
<<<<<<< HEAD
        <Carousel showThumbs={false}>
          
          <div className="relative h-[400px] w-full overflow-clip">
            <img src="cougar.jpeg" alt="Cougar" />
            <p className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2">Legend 1</p>
          </div>
          <div className="relativeh h-[400px] w-full overflow-clip">
            <img src="cougar.jpeg" alt="Another" />
            <p className="absolute justify-center items-center bg-black bg-opacity-50 text-white p-2">Legend 2</p>
=======
        <Carousel className=''
        showThumbs={false} 
        autoPlay={true} 
        interval={10000} 
        infiniteLoop={true}>
          <div className="relative h-[400px] w-full overflow-clip">
            <img src="cougar.jpeg" alt="Cougar" />
            <p className="font-mono whitespace-nowrap absolute text-2xl font-semibold right-[70%] left-0 top-[40%] text-white p-2 ml-3">Welcome to the Coog Zoo!</p>
            <div className='absolute border-t-2 border-white right-7 left-0 bottom-8 top-[53%] w-4/5 ml-5'></div>
            <Link to="/tickets">
              <button className='absolute right-7 left-0 bottom-28 font-semibold bg-white p-1 rounded-full w-[150px] h-[40px] ml-4'> Plan Your Visit </button>
            </Link>
          </div>
          <div className="relativeh h-[400px] w-full overflow-clip">
            <img src="cougar.jpeg" alt="Another" />
            <p className="font-mono absolute text-2xl font-semibold left-0 right-[70%] top-[40%] text-white p-2">Legend 2</p>
            <div className='absolute border-t-2 border-white right-7 left-0 bottom-8 top-[53%] w-4/5 ml-5'></div>
            <div className='absolute border-t-2 border-white right-7 left-0 bottom-8 top-[53%] w-4/5 ml-5'></div>
            <Link to="/tickets">
              <button className='absolute right-7 left-0 bottom-28 font-semibold bg-white p-1 rounded-full w-[150px] h-[40px] ml-4'> Reserve tickets </button>
            </Link>
>>>>>>> 0e45ec9c651f1255804ab6e367f7c6a3488b96e5
          </div>
        </Carousel>
      </header>

       {/* Add more images here */}

     
     {/* //membership singup */}
      <section className='overflow-y-scroll relative mt-20'>
          <div className='text-bold text-white bg-[#faf0e6] h-[200px] m-4 p-6 relative'>
              <p className='font-bold text-2xl text-[#165e229e]'>Become a member</p>
<<<<<<< HEAD
              <p className='font-bold text-lg text-[#165e229e]'>
=======
              <p className='font-bold text-lg text-[#165e229e] '>
>>>>>>> 0e45ec9c651f1255804ab6e367f7c6a3488b96e5
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
<<<<<<< HEAD
    <Link > 
      <section className='overflow-y-scroll relative '>
        <div className='text-bold text-white  bg-[#faf0e6] h-[200px] m-4 p-6 relative'>
        <p className='font-bold text-2xl text-[#165e229e]'>Donate Today</p>
        <p className='font-bold text-sm text-[#165e229e]'>You play a crucial role in the success of the Houston Zoo's education and animal care programs, global field projects, and local conservation initiatives through your donations.</p>
=======
    <Link> 
      <section className='overflow-y-scroll relative '>
        <div className='text-bold text-white  bg-[#faf0e6] h-[200px] m-4 p-6 relative'>
        <p className='font-bold text-2xl text-[#165e229e]'>Donate Today</p>
        <p className='font-bold text-md text-[#165e229e]'>You play a crucial role in the success of the Houston Zoo's education and animal care programs, global field projects, and local conservation initiatives through your donations.</p>
>>>>>>> 0e45ec9c651f1255804ab6e367f7c6a3488b96e5
        <button className='absolute bg-[#165e229e] rounded-xl hover:bg-green-900 text-white font-bold w-[200px] p-2 bottom-4 right-4'>
                Donate Today
        </button>
        </div>
      </section>
     </Link>
<<<<<<< HEAD

      <div className=''>
      <EventCal/>
      </div>
    

=======
      <div>
        test test
      </div>
>>>>>>> 0e45ec9c651f1255804ab6e367f7c6a3488b96e5
    </div>
  );
}

export default Home;