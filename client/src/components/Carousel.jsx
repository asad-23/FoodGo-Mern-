import React, { useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function Carousel() {

    const imgSrc = [
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-…',
        'https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg',
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-…',
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () =>{
        setCurrent(current === imgSrc.length -1 ? 0 : current + 1);
    }
    const prevSlide = () =>{
        setCurrent(current === 0 ? imgSrc.length -1 : current - 1);
    }

  return (
    <div className='overflow-hidden'>
      <div style={{transform: `translateX(-${current * 100}vw)`}} className='flex transition ease-out duration-1000'>
        {imgSrc.map((s) => {
            return <img src={s} />
        })}
      </div>

      <div className='flex absolute top-0 h-full w-[60%] justify-between items-center'>
        <button onClick={prevSlide}><FaAngleLeft size={30}/></button>
        <button onClick={nextSlide}><FaAngleRight size={30}/></button>
      </div>
    </div>
  )
}
