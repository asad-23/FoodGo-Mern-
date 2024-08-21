import React, { useEffect, useState } from 'react'
import { useCart, useCartDispatch } from './ContextReducer.jsx'
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios'
import toast from 'react-hot-toast'



export default function Cart() {

    const [location, setLocation] = useState();

    let data = useCart();
    let dispatch = useCartDispatch()

    if (data.length === 0) {
        return (
            <div className='font-bold text-2xl md:w-[70%] w-[95%]'>
                <div className='m-5 text-center'>No Items Added in the Cart</div>
            </div>
        )
    };


    const handleCheekOut = async (e) => {
        e.preventDefault();
        if(!location) return alert('Please provide your location')
        let date = new Date().toDateString();
        let userEmail = localStorage.getItem('userEmail')

        axios.post('http://localhost:5000/api/orderdata', {
            order_date:{
                date: date,
                location: location
            },
            order_data: data,
            email: userEmail
        },{
            headers: {"content-type" : "application/json"},
            withCredentials: true
        }).then((response) =>{
            const data = response.data
            dispatch({type: 'DROP'})
            toast.success('Order placed successfully')
        }).catch((error) =>{
            const data = error.response.data
            toast.error(data.message || "Something went wrong")
        })
    }


    let totalPrice = 0;
    data.map(food => {
        totalPrice += food.totalPrice
    })

    return (
        <div>
            <table className='md:w-[70%] w-[95%] mx-auto mt-[2rem] flex flex-col'>
                <thead className='ring-2 rounded-lg p-2'>
                    <tr className='flex justify-between'>
                        <th>No#</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th className='pr-4'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((food, index) => (
                            <tr className='flex justify-between'>
                                <th className='pl-2'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.count}</td>
                                <td>{food.totalPrice}
                                    <button type='button' className='mx-2' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}> <FaRegTrashAlt /> </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='text-center text-2xl font-bold mt-4'>Total Amount : {totalPrice}</div>
            <div className='text-center my-2'>
                <label className='font-bold text-2xl'>Location: </label>
                <input onChange={(e)=>{setLocation(e.target.value)}} className='ring-2 px-4 py-1 rounded-lg' type="text" />
            </div>
            <div className='text-center'>
                <button onClick={handleCheekOut} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg text-white text-xl font-semibold'>Buy Now</button>
            </div>
        </div>
    )
}
