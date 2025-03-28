import { useState } from "react"
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  
  const [errorMessage, setErrorMessage] = useState({})
  const [SignedMessage, setSignedMessage] = useState('')
  const [loginData, setLoginData] = useState({
    email: "",
    password:""
  })
  
function handleCancel(){
  setErrorMessage({})
  setSignedMessage("You are not logged in, redirecting to home page")
  setTimeout(()=>(navigate('/')), 3000)
}
  
function handleChange(e) {
  e.preventDefault()
  const name = e.target.name;
  const value = e.target.value;
  setLoginData((prev=>({...prev, [name]: value})))
}

function handleSubmit(e){
  const error = {}
  e.preventDefault();
  if (!loginData.email?.trim() || !/\S+@\S+\.\S+/.test(loginData.email)) {
    error.email = "Enter a valid email";
  }
  if(!loginData?.password.trim() || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(loginData.password)){
    error.password = "Password must be not be less than 8 contain an uppercase, lowercase, number and unique character"
  }
 
  setErrorMessage(error);
    
    if (Object.keys(error).length === 0) {
      setSignedMessage("You are now logged in")
      setTimeout(()=>(navigate("/")), 3000)
    }
}


  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="mx-auto w-full sm:w-1/2 shadow-lg border-2 rounded-md py-4 pr-10">
          <form action="" method="get" onSubmit={handleSubmit} className="w-1/2  mx-auto">
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" onChange={handleChange} className="rounded-md focus:bg-slate-200 px-3 py-1"/>
            </div>
            {errorMessage && <span className="text-red-700 text-xs">{errorMessage.email}</span>}
          <div className="mb-2">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" onChange={handleChange} className="rounded-md focus:bg-slate-200 px-3 py-1"/>
          </div>
            {errorMessage && <span className="text-red-700 text-xs password">{errorMessage.password}</span>}
          <div className="flex gap-10 mt-4">
            <button className="py-1 px-2 hover:bg-red-600 hover:text-white rounded-lg" type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit" onClick={handleSubmit} className="py-1 px-2 hover:bg-green-600 hover:text-white rounded-lg">Login</button>
          </div>
          </form>
      </div>
      <div className="absolute top-10 sm:top-20 px-3 ">
        {SignedMessage && 
          <h2 className={
            `${SignedMessage === 'You are now logged in' ? "text-green-500" : "text-red-600"} text-md font-semibold`}>
              {SignedMessage}
          </h2>
        }
      </div>
    </div>
  )
}

export default Login
