import React, { useEffect, useState } from 'react'
import { useCart } from './ContextReducer';
import axios from 'axios'
import {CircleLoader} from 'react-spinners'

export default function Order() {

    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false)
    
    const loadOrder = async (e) => {
      const email = await localStorage.getItem('userEmail');

      try {
        setLoading(true)
        axios.post('http://localhost:5000/api/orderdatalist', {email},{
          headers: {"content-type" : "application/json"},
          withCredentials: true
        }).then((response) =>{
          const data = response.data
          let newData = data[0].order_data
          setOrderData(newData)
          setLoading(false)
        }).catch((error) =>{
          console.log(error)
          setLoading(false)
        })
      } catch (error) {
        console.log(error)  
      };
   };

    
    useEffect(() => {
        loadOrder()
    },[])

    if(setOrderData === null){
      <div className='text-center text-2xl font-bold'>No items have purched yet</div>
    }

    return (
        <div className='overflow-auto'>
          {loading ? (
          <div className='flex flex-col justify-center items-center w-full h-[70vh]'>
            Loading... <br /> <br />
          <CircleLoader color="#ef43c4" size={80} />  
          </div>) : (
            orderData && orderData.map((item) => (
              <div key={item[1].id}>
                {item.map((subItem, index) => (
                  <div key={index}>
                    {index === 0 ? (
                      <div>Date: {subItem.order_date.date} <hr /></div>
                    ) : (
                      <div className='border inline-block rounded-md m-4 p-4'>
                        <span className='font-bold'>{subItem.name}</span> <br />
                        <span>Price: {subItem.price}</span> <br />
                        <span>Count: {subItem.count}</span> <br />
                      </div>
                    )}
                  </div>
                ))}
                <hr />
              </div>
            )))}
        </div>
      );
}