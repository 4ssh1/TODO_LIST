import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate()  
  
    const [errorMessage, setErrorMessage] = useState({})
    const [SignedMessage, setSignedMessage] = useState('')
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        conPass: ""
    })




    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        
        setFormData((prev)=>{
            return {...prev, [name]: value}
        })
    }


    async function handleSubmit(e) {
       const  error = {}
        e.preventDefault();
        if(!formData?.name.trim()){
            error.name = "Name is required"
        }
        if(!/^[A-Za-z]+$/.test(formData.name)){
          error.name = "Enter a valid name "
        }
        if (!formData?.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          error.email = "Enter a valid email";
        }
        if(!formData?.password.trim() || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)){
          error.password = "Password must be not be less than 8 contain an uppercase, lowercase, number and unique character"
        }
        if(formData.password !== formData.conPass){
          error.confirm = "Passwords do not match"
        } 
  
        setErrorMessage(error);
    
        if (Object.keys(error).length === 0) {
          setSignedMessage("You are now signed in")
          const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/quote`)
          if(!data) return 
          console.log(data)
          setTimeout(()=>(navigate("/")), 3000)
        }
    }
   
  return (
    <div className="mx-auto sm:w-1/2 sm:translate-x-20">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md ">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create an Account</h2>
      
      <form action="" method="get" className="space-y-5" onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" id="name" name="name" value={formData?.name} onChange={handleChange}
                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                 {errorMessage && <span className="text-red-700 text-xs">{errorMessage?.name}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" id="email" name="email" value={formData?.email} onChange={handleChange}
                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  {errorMessage && <span className="text-red-700 text-xs">{errorMessage?.email}</span>}

        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" id="password" name="password" value={formData?.password} onChange={handleChange}
                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  {errorMessage && <span className="text-red-700 text-xs">{errorMessage?.password}</span>}

        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input type="password" id="confirm" name="conPass" value={formData?.conPass} onChange={handleChange}
                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                {errorMessage && <span className="text-red-700 text-xs">{errorMessage?.confirm}</span>}

        </div>
        <div>
          <button type="submit" onClick={(e)=>handleSubmit(e)}
                  className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </div>
        <p className="text-center text-sm text-gray-600">Already have an account? 
          <button className="text-blue-600 hover:underline outline-none border-none pl-1" onClick={()=>navigate('/login')}> Log in</button>
        </p>
      </form>
        <div className="absolute top-10 sm:top-20 px-3">
              {SignedMessage &&
              <h2 classNameName={
                `${SignedMessage === 'You are now signed in' ? "text-green-500" : "text-red-600"} text-md font-semibold`}>
                  {SignedMessage}
              </h2>
              }
            </div>
      </div>
    </div>
  )
}

export default Signin
