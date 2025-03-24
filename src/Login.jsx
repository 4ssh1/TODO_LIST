import { useState } from "react"
import {useNavigate} from 'react-router-dom'

function Login() {
  const [errorMessage, setErrorMessage] = useState({})
  const [SignedMessage, setSignedMessage] = useState('')
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password:""
  })

function handleChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  setLoginData((prev=>({...prev, [name]: value})))
}

function handleSubmit(e){
  error = {}
  e.preventDefault();
  if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
    error.email = "Enter a valid email";
  }
  if(!formData?.password.trim() || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)){
    error.password = "Password must be not be less than 8 contain an uppercase, lowercase, number and unique character"
  }
  if(!/^[A-Za-z]+$/.test(formData.name)){
    error.name = "Enter a valid name format"
  }
  setErrorMessage(error);
    
    if (Object.keys(error).length === 0) {
      setSignedMessage("You are now logged in")
      setTimeout(()=>(navigate("/")), 3000)
    }
}

  return (
    <div>
        <form action="" method="get" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label><input type="email" name="email" id="email" onChange={handleChange} />
          </div>
          {errorMessage && <span className="text-red-700 text-xs">{errorMessage.email}</span>}
        <div>
          <label htmlFor="password">Password:</label><input type="password" name="password" id="password" onChange={handleChange}/>
          </div>
          {errorMessage && <span className="text-red-700 text-xs">{errorMessage.password}</span>}
          <div className="flex gap-10 mt-4">
          <button className=""onClick={handleSignup}>Sign Up</button>
          <button type="submit" onClick={handleSubmit} className="">Login</button>
        </div>
        <h3 className="text-green-700 ">{SignedMessage}</h3>
        </form>
    </div>
  )
}

export default Login
