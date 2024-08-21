import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'
import {CircleLoader} from 'react-spinners'
import baseURL from '../url.js'
import axios from 'axios'

const Home = () => {

  const [search, setSearch] = useState('');
  const [food, setFood] = useState('');
  const [category, setCategory] = useState('');

  
  const loadData = async() => {

    try {
      axios.post("http://localhost:5000/api/displaydata").then((response) => {
        setFood(response.data[0])
        setCategory(response.data[1])
     }).catch((error) => {
       console.log(error)
     });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, []);


  const [width, setWidth] = useState(window.innerWidth)
  window.addEventListener("resize", () =>{
    setWidth(window.innerWidth)
  })

  return (
    <div className='max-w-[1100px] mx-auto mt-[5rem]'>
      <div className='text-center'>
        <form>
          <input className={`${width < 700 ? 'w-[80%]' : 'w-[60%]'} my-6 p-2 ring-2 rounded-lg`} onChange={(e) => setSearch(e.target.value)} value={search} type="search" placeholder='Search' />
        </form>
      </div>
      <div>
        {
          category ? category.map(data => {
            return (
              <div key={data._id}>
                <div className='text-xl text-center' key={data._id}>
                  {data.CategoryName}
                </div>

                <hr />

                <div className='flex justify-center my-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
                    {
                      food ? food.filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map(item => {
                        return(
                          <div key={item._id}>
                            <Card id={item._id} name={item.name} img={item.img} price={item.price} />
                          </div>
                        )
                      }) : 
                      <div className='flex justify-center items-center w-full h-[75vh]'>
                        Loading... <br /> <br />
                        <CircleLoader color="#ef43c4" size={80} />
                      </div>
                    }
                  </div>
                </div>
              </div>
            )
          }) : 
          <div className='flex flex-col justify-center items-center w-full h-[75vh]'>
            Loading... <br /> <br />
          <CircleLoader color="#ef43c4" size={80} />  
          </div>
        }
      </div>
    </div>
  )
}

export default Home
