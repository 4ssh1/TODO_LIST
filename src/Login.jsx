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
      // try {
      //   const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signin`, {...loginData})
      // } catch (error) {
      //   console.log(error)
      // }
    }
}


  return (
    <div className="mx-auto sm:w-1/2 sm:translate-x-20">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
      <form action="" method="get" className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" id="email" name="email" 
                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  {errorMessage && <span className="text-red-700 text-xs">{errorMessage?.email}</span>}

        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" id="password" name="password" 
                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
               {errorMessage && <span className="text-red-700 text-xs">{errorMessage?.password}</span>}

        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 focus:ring-blue-500"/>
            <span className="text-gray-700">Remember me</span>
          </label>
          <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </div>
        <p className="text-center text-sm text-gray-600">Don't have an account?
          <button className="text-blue-600 hover:underline border-0 pl-1" onClick={()=>navigate('/signup')}>Sign up</button>
        </p>
      </form>
        </div>
    </div>
  )
}

export default Login
