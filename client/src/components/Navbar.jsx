import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineMenuOpen } from "react-icons/md"
import { MdRestaurantMenu } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Modal from '../Modal';
import Cart from './Cart';
import Order from './Order';



const Navbar = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [idOpen, setIdOpen] = useState(false);

  const [cartView, setCartView] = useState(false)
  const [orderView, setOrderView] = useState(false);

  window.addEventListener("scroll", () => {
    if (open === true) return setOpen(false);
    if (idOpen === true) return setIdOpen(false);
  })

  const handleDown = () => {
    if(open) return setOpen(!open);
  }

  const handleChange = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  }

  const LinkButtonSmall = `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-center rounded-lg`

  return (
    <>
      <nav className='flex bg-white justify-between md:justify-around items-center h-16 shadow-md text-xl fixed z-10 top-0 w-full'>
        <div className='text-xl flex rounded-lg text-black text-bold'>
          <span onClick={() => setOpen(!open)} className='md:hidden px-4 font-bold text-3xl text-black cursor-pointer'>
            {open ? <MdRestaurantMenu /> : <MdOutlineMenuOpen />}
          </span>
          <Link to='/'>
            Food<span className='px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>App</span>
          </Link>
        </div>

        {/* Wide Screen side links */}
        <div>
          <ul className='md:flex hidden text-gray-700'>
            <li className='p-4 hover:text-black'><Link to='/'>Home</Link></li>
            <li className='p-4 hover:text-black'><Link to='/about'>About</Link></li>
            <li className='p-4 hover:text-black'><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>

        {orderView ? <Modal onClose={() => setOrderView(false)}> <Order /> </Modal> : null}
        {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : null}

        {/* Right side id dropdown */}
        {
          (localStorage.getItem('authToken')) ?
            <div className='relative px-4'>
              <div className='inline-block'>
                <span onClick={() => setIdOpen(!idOpen)} className='ring-2 p-2 rounded-full flex'>
                  <IoPersonOutline size={20} />
                  <IoIosArrowDown className='cursor-pointer' />
                </span>
              </div>
              <ul className={`${idOpen ? 'inline-block': 'hidden'} bg-white ring-2 rounded-md w-[140px] top-[55px] right-1 absolute`}>
                <li className='p-2'><div onClick={() => setOrderView(true)} className='hover:text-black cursor-pointer'>My Ordrer</div></li> <hr />
                <li className='p-2'><div onClick={() => setCartView(true)} className='hover:text-black cursor-pointer'>My Cart</div></li> <hr />
                <li className={`${LinkButtonSmall}`}><Link onClick={handleChange}>Logout</Link></li>
              </ul>
            </div> :
            <Link to='/login' className={LinkButtonSmall}>Login</Link>
        }

        {/* Small Screen dropdown navbar */}
        <ul className={`${open ? 'top-[65px]' : `top-[-400px]`} md:hidden bg-white absolute w-full flex flex-col text-center transition-all duration-200 ease-in shadow-lg text-gray-700`}>
          <li className='p-4 hover:text-black'><Link onClick={handleDown} to='/'>Home</Link></li>
          <li className='p-4 hover:text-black'><Link onClick={handleDown} to='/about'>About</Link></li>
          <li className='p-4 hover:text-black'><Link onClick={handleDown} to='/contact'>Contact</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
