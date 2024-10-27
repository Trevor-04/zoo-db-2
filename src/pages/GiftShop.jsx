import React from 'react'
import GiftshopWrapper from '../components/GiftshopWrapper';

function giftshop({imageUrl, name}) {

  const gifts = [];
  return (

    <div className='flex flex-col items-center justify-start min-h-screen bg-white'>
      {/* Header Section */}
      <div className='w-full text-center text-white font-bold bg-[#165e229e] py-12'>
        <h1 className="relative text-2xl md:text-4xl lg:text-5xl">Our Products</h1>
      </div>
      <GiftshopWrapper gifts={gifts}/>
    </div>
  )
}

export default giftshop
