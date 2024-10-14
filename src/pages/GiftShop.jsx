import React from 'react'
import GiftshopWrapper from '../components/GiftshopWrapper';

function giftshop({imageUrl, name}) {

  const gifts = [];
  return (

    <div className="relative px-5 py-5 bg-white justify-center items-center w-full">
       <header className='m-4 text-xl font-bold lg:text-3xl'>
        Coog Zoo Giftshop
      </header>
      <GiftshopWrapper gifts={gifts}/>
    </div>
  )
}

export default giftshop
