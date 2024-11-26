import React,  {useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Passwordinpt from "../../components/input/Passwordinpt";
import { validateEmail } from '../../utils/helper';
import {toast} from "react-toastify";
import axios from 'axios';

const Signup = () => {

  // Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter name.");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter valid email address.");
      return;
    }

    if(!password){
      setError('Please enter password.');
      return;
    }
    setError("");

    //SignUp API call
    try {
      let response = await axios.post("http://localhost:8000/api/v1/user/register",{
          fullname:name,
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
        navigate("/login");
        toast.success(response.data.message);
      }

      } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
  }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border  drop-shadow-lg rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinpt
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
               Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
