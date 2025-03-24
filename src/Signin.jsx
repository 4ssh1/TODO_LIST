import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Signin() {
  
    const [errorMessage, setErrorMessage] = useState({})
    const [SignedMessage, setSignedMessage] = useState('')
    const navigate = useNavigate()
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
    <div>
      <form action="" method="get" onSubmit={handleSubmit} className="w-1/2  mx-auto">
        <div><label htmlFor="name">Full Name: </label><input type="text" name="name" 
        id="name" onChange={handleChange} />
        </div>
        {errorMessage && <span className="text-red-700 text-xs">{errorMessage.name}</span>}
        <div><label htmlFor="email">Email:</label><input type="email" name="email" 
        id="email"  onChange={handleChange}/>
        </div>
        {errorMessage && <span className="text-red-700 text-xs">{errorMessage.email}</span>}
        <div><label htmlFor="password">Password</label><input type="password" name="password" 
        id="password" onChange={handleChange} />
        </div>
        {errorMessage && <span className="text-red-700 text-xs">{errorMessage.password}</span>}
        <div><label htmlFor="conPass">Confirm password</label><input type="password" name="conPass" 
        id="conPass"  onChange={handleChange}/>
        </div>
        {errorMessage && <span className="text-red-700 text-xs">{errorMessage.confirm}</span>}
        <div className="flex gap-10 mt-4">
          <button className="" type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit" onClick={handleSubmit} className="">Submit</button>
        </div>
        <h3 className="text-green-700 ">{SignedMessage}</h3>
      </form>
    </div>
  )
}

export default Signin
