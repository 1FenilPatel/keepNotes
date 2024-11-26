import React, { useState } from 'react'
import { SlNote } from "react-icons/sl";
import ProfileInfo from '../Cards/ProfileInfo';
import {useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = ({userInfo,onSearchNote}) => {

  // Hooks
  const [seacrchQuery , setSeacrhQuery] = useState("");
  const navigate = useNavigate();

  // User LogOut
  const onLogout = async()=>{
    localStorage.clear();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/logout" , {}, {withCredentials :true})
      if(res.data.success){
          toast.success(res.data.message);
          navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () =>{
    if(seacrchQuery){
      onSearchNote(seacrchQuery)
    }
  }

  const onClearSearch = ()=>{
    setSeacrhQuery("");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium flex gap-4 items-center text-black py-2'>Notes <SlNote/> </h2>

        <SearchBar value={seacrchQuery} 
        onChange={({target})=>{
          setSeacrhQuery(target.value)
        }}
        
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}/>

        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar