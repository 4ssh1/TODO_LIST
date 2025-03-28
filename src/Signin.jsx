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

    function handleCancel(){
      setErrorMessage({})
      setSignedMessage("You are not signed in, redirecting to home page")
      setTimeout(()=>(navigate('/')), 3000)
    }

    function handleSubmit(e) {
       const  error = {}
        e.preventDefault();
        if(!formData?.name.trim()){
            error.name = "Name is required"
        }
        if(!/^[A-Za-z]+$/.test(formData.name)){
          error.name = "Enter a valid name format"
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
          setTimeout(()=>(navigate("/")), 3000)
        }
    }
   
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-auto w-full sm:w-1/2 shadow-lg border-2 rounded-md py-4 pr-10">
        <form action="" method="get" onSubmit={handleSubmit} className="w-1/2  mx-auto">
          <div className="mb-2">
            <label htmlFor="name">Full Name: </label><input type="text" name="name"
          id="name" onChange={handleChange}  className="rounded-md focus:bg-slate-200 px-3 py-1" />
          </div>
          {errorMessage && <span className="text-red-700 text-xs">{errorMessage.name}</span>}
          <div className="mb-2">
            <label htmlFor="email">Email:</label><input type="email" name="email"
          id="email"  onChange={handleChange} className="rounded-md focus:bg-slate-200 px-3 py-1"/>
          </div>
          {errorMessage && <span className="text-red-700 text-xs">{errorMessage.email}</span>}
          <div>
            <label htmlFor="password">Password</label><input type="password" name="password"
          id="password" onChange={handleChange}  className="rounded-md focus:bg-slate-200 px-3 py-1"/>
          </div>
          {errorMessage && <span className="text-red-700 text-xs password">{errorMessage.password}</span>}
          <div className="mb-2">
            <label htmlFor="conPass">Confirm password</label><input type="password" name="conPass"
          id="conPass"  onChange={handleChange} className="rounded-md focus:bg-slate-200 px-3 py-1"/>
          </div>
          {errorMessage && <span className="text-red-700 text-xs">{errorMessage.confirm}</span>}
          <div className="flex gap-10 mt-4">
            <button className="py-1 px-2 hover:bg-red-600 hover:text-white rounded-lg" 
            type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit" onClick={handleSubmit} 
            className="py-1 px-2 hover:bg-green-600 hover:text-white rounded-lg">Submit
            </button>
          </div>
        </form>
      </div>
      <div className="absolute top-10 sm:top-20 px-3">
            {SignedMessage && 
            <h2 className={
              `${SignedMessage === 'You are now signed in' ? "text-green-500" : "text-red-600"} text-md font-semibold`}>
                {SignedMessage}
            </h2>
            }
          </div>
    </div>
  )
}

export default Signin
