import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import toast from 'react-hot-toast'


export default function Signup() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const[mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const Navigate = useNavigate();

    const inputStyle = "ring-2 px-4 py-2 rounded-lg mb-2";
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !email || !password || !mobile) return toast.error("Please fill all the fields");
        if(password.length < 4) return toast.error("Password must be at least 4 characters");
        
        setLoading(true)
        axios.post('https://foodgo-mern.onrender.com/api/createuser', {
            name, mobile, email, password
        },{
            headers: {"content-type" : "application/json"},
            withCredentials: true
        }).then((response) =>{
            const data = response.data
            localStorage.setItem('userEmail', email);
            localStorage.setItem('authToken', data.token);
            setLoading(false)
            Navigate('/');
            toast.success('Signup succesfully')
        }).catch((error)=>{
            const data = error.response.data
            toast.error(data.message || "Something went wrong")
            setLoading(false)
        })

        setLoading(false)
    }

  return (
    <div className='h-[85vh] max-w-[1100px] mx-auto flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex w-[300px] flex-col p-2'>
            <label>
                Name: <br />
                <input className={inputStyle} onChange={e => setName(e.target.value)} type="text" name="name" />
            </label>
            <label>
                Mobile: <br />
                <input className={inputStyle} onChange={e => setMobile(e.target.value)} type="number" name="mobile" />
            </label>
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
            <button className='bg-gradient-to-r my-2 from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg' type="submit">
                {loading ? <ClipLoader color="#000000" /> : "Signup"}
            </button>
        </form>
    </div>
  )
}
