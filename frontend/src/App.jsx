import React from 'react'
import Home from './pages/Home/Home'
import {Routes , Route, Navigate} from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import Pnf from './pages/PageNoteFound/Pnf';
import {GoogleOAuthProvider} from "@react-oauth/google";


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/dashboard' exact element={<Home/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/' exact element={<Signup/>}/>
        <Route path='*' exact element={<Pnf/>}/>
      </Routes>
    </div>
  )
}

export default App