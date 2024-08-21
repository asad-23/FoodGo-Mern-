import React, { useEffect } from 'react'
import { useState } from 'react'
import {useCart, useCartDispatch} from './ContextReducer.jsx'
import toast from 'react-hot-toast'

const Card = (props) => {

  let data = useCart()
  let dispatch = useCartDispatch()
  const [count, setCount] = useState(1)
  const totalPrice = props.price * count
  const itemName = props.name
  const img = props.img
  const id = props.id

  const authToken = localStorage.authToken
  
  const addToCart = async() => {

    if(authToken === undefined) return toast.error('Please login first');

    const itemToUpdate = data.find(item => item.id === id);
    if(itemToUpdate){
      dispatch({
        type: 'UPDATE',
        id: id,
        count: count,
        totalPrice: totalPrice
      })
    }else{
      await dispatch({
        type: 'ADD',
        id: id,
        name: itemName,
        price: props.price,
        totalPrice: totalPrice,
        count: count
      });

    }


  }

  
  const decrement = () => {
    if(count > 1) return setCount(count-1) 
  }

  return (
    <>
    <div className='flex flex-col shadow-lg w-[16rem] m-4 rounded-lg hover:shadow-2xl hover:translate-y-[-4px] duration-300 ease-in-out'>
      <div className='h-[10rem] bg-gray-300 rounded-lg'>
        <img className='rounded-lg w-[16rem] h-[10rem] bg-center bg-cover bg-no-repeat' src={img} alt="Chiken Biriyani" />
      </div>
      <div className='mt-2 font-bold text-2xl text-center'>{itemName}</div>
      <div className='m-2 p-2'>
        <span className='font-bold'>Price: ${props.price}</span> <br />
        <span><button onClick={decrement} className='px-2 rounded-md bg-slate-300'>-</button> Quantity: {count} <button onClick={() => setCount(count+1)} className='px-2 rounded-md bg-slate-300'>+</button></span> <br />
        <span>Total Price : {totalPrice}</span>
      </div>
      <button onClick={addToCart} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg'>Add to cart</button>
    </div>
    </>
  )
}

export default Card
