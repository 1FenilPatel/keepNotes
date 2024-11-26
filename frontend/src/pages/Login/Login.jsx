import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import {Link, useNavigate} from "react-router-dom";
import Passwordinpt from '../../components/input/Passwordinpt';
import { validateEmail } from '../../utils/helper';
import {toast} from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async (e) =>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if(!password){
            setError("Please enter the password ");
            return;
        }
        setError("");

        // login api call
        try {
            let response = await axios.post("http://localhost:8000/api/v1/user/login",{
                email:email,
                password:password
            },{
                    headers:{
                        "Content-Type":"application/json",
                    },
                    withCredentials:true
            })

            if(response.data.success){
                localStorage.setItem("token",response.data.token);
                toast.success(response.data.message);
                navigate("/dashboard");
            }
            
            } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

  return (
    <>
       <Navbar/>

        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border  drop-shadow-lg rounded bg-white px-7 py-10'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <input type="text" placeholder='Email' className='input-box'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Passwordinpt value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='btn-primary'>Login</button>
                    <p className='text-sm text-center mt-4'>Not register yet?
                            <Link to="/signup" className='font-medium text-primary underline'> Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login