import React from 'react'
import Home from './screen/Home.jsx'
import Contact from './screen/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './screen/Signup.jsx'
import Login from './screen/Login.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider } from './components/ContextReducer.jsx'
import About from './screen/About.jsx'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
        <Toaster reverseOrder={true} />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
