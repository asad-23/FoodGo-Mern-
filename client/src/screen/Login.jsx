import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import toast from 'react-hot-toast'


export default function Signup() {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate();

    const inputStyle = "ring-2 px-4 py-2 rounded-lg mb-2";

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!email || !password) return toast.error("Please fill all the fields");
        if(password.lenth < 4) return toast.error("Password must be at least 4 characters");

        setLoading(true)
        axios.post('http://localhost:5000/api/login',
            {
                email, password
            },{
                headers:{"content-type" : "application/json"},
                withCredentials: true
            }).then((response) => {
            const data = response.data
            localStorage.setItem('userEmail', email)
            localStorage.setItem('authToken', data.token);
            setLoading(false)
            Navigate('/');
            toast.success('Login succesfully')
        }).catch((error) => {
            const data = error.response.data
            toast.error(data.message)
            setLoading(false)
        });

    setLoading(false)
    }

  return (
    <div className='h-[85vh] max-w-[1100px] mx-auto flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex w-[300px] flex-col p-2'>
            <label>
                Email: <br />
                <input className={inputStyle} onChange={e => setEmail(e.target.value)} type="text" name="email" />
            </label>

            <label style={{position: "relative"}}>
                Password: <br />
                <input className={inputStyle} onChange={e => setPassword(e.target.value)} type={show === false ? "password" : "text"} name="password" />
                {show === false ?
                <IoMdEye onClick={() => setShow(!show)} style={{position: "absolute", right: "15px", top: "34.8px", cursor: "pointer"}} /> :
                <IoMdEyeOff onClick={() => setShow(!show)} style={{position: "absolute", right: "15px", top: "34.8px", cursor: "pointer"}} />}
            </label>
            <button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg' type="submit">
                {loading? <ClipLoader color="white" size={20} /> : "Login"}
            </button>
            <br />
            <p className='text-xl'>Don't have an account? <Link className='text-pink-500' to="/signup">Signup</Link></p>
        </form>
    </div>
  )
}