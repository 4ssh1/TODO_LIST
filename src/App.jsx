import { useEffect, useState } from "react"
// import "./index.css"
import SelectOpt from "./selectOpt"
import { useNavigate } from "react-router-dom"


function App() {
  const [darkmode, setDarkMode] = useState(()=>{
    return JSON.parse(localStorage.getItem("Theme")) || false
  })
  const [quote, setQuote] = useState("")
  const [Todos, setTodos] = useState([])
  const [searchArray, setSearchArray] = useState([])
  const [showOption, setShowOption] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [editedValue, setEditedValue] = useState("")
  const [search, setSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedMode, setSelectedMode] = useState("all")
  const [updateTodo, setUpdateTodo] = useState(-1)
  const [SearchPlaceHolder, setSearchPlaceHolder]= useState("Search note...")
  const navigate = useNavigate()
 

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("Todo"));
    if (storedTodo && storedTodo.length > 0) {
      setTodos(storedTodo)
    }
  }, [])

  useEffect(()=>{
    function fetchQuote() {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/quotes`,{
        method: "GET",
        credentials: "include"
      })
            .then(response=>response.json())
            .then(data=> setQuote(data.quote))
            .catch(error=> console.log("Error fetching data: ", error))
    }

    fetchQuote()
    const interval = setInterval(fetchQuote, 10 * 1000);

    return ()=> clearInterval(interval)
  }, [])

  useEffect(() => {
    return localStorage.setItem("Todo", JSON.stringify(Todos))
  }, [Todos])

  useEffect(()=>{
    localStorage.setItem("Theme", JSON.stringify(darkmode))
  }, [darkmode])

  useEffect(()=>{
    show()
  },[searchValue])

   function addButton() {
    setShowOption(true)
    setInputValue("")
  }

  function removeOpt() {
    setShowOption(false)
    setInputValue("")
  }

  function addtoTodo(e) {
    const newValue = e.target.value;
    setInputValue(newValue)
    setErrorMessage("")
    setSelectedMode("all")
  }

  function checkTodo(done, index) {
    const updatedTodos = Todos.map((todo, i) =>
      i === index ? { ...todo, done } : todo
    );
    setTodos(updatedTodos)
  }

  function pushtoTodo() {
    if (inputValue.trim().length === 0) {
      setErrorMessage("Invalid input")
      setInputValue("")
    } else {
      const newTodo = { note: inputValue, done: false };

      fetch(`${import.meta.env.VITE_BACKEND_URL}/add`,{
         method: "POST",
         body: JSON.stringify({
            task: newTodo
         }),
         headers:{
          "Content-type": "application/json; charset= UTF-8"
         }
        })
        .then(response=> {
          if(!response.ok){
            throw new Error('HTTP error!, status:' + response.status)
          }
          return response.json()
        })
        .then(finalRes=> console.log(finalRes))
        .catch(err=>console.log("Fetch error:", err))

      const updatedTodos = [...Todos, newTodo];
      if(selectedMode === "all"){
        console.log(updatedTodos)
        setTodos(updatedTodos);
      }
      setShowOption(false);
      setErrorMessage("")
    }
  }

  function deleteTodo(index) {
    const newTodo = Todos.filter((_, i) => {
      return i != index
    })
    setTodos(newTodo)
  }

  const newTodo = Todos.filter((todo)=>{
    if (selectedMode === "complete"){
      console.log(todo.done)
      return todo.done
    }
    else if (selectedMode === "incomplete"){
      console.log(!todo.done)
      return !todo.done
    }
    else{
      return true
    }
  })
  
  function show(){
    if(searchValue.length=== 0){
      setSearch(false)
    }else{
      const searched = Todos.filter(elements => {
        return elements.note.toLowerCase().includes(searchValue.toLowerCase())
      })
      setSearch(true)
      setSearchArray(searched)
    }
   
  }

  function cancelSearch(){
    setSearch(false)
    setSearchValue('')
    setSearchPlaceHolder("Search note ...")
  }

  function renameTodo(i){
    const newTodo = [...Todos].map((_, ind)=>{
      if (ind == i){
        setShowEdit(true)
        setUpdateTodo(i) // made the magic happen
      }
    })
    return newTodo
  }

  function handleEdit(e){
    setEditedValue(e.target.value)
  }

  function endOfRename(index){
    const updatedTodos = Todos.map((todo, i) =>
        i === index && editedValue !== ""? { ...todo, note:editedValue } : todo
      );
      setTodos(updatedTodos)
      setShowEdit(false)
      setEditedValue("")
    }

  return (
    <>
      <div className={`${darkmode ? "bg-slate-900 text-white" : "bg-white"} min-h-screen w-100% relative pt-5 
      ${showOption && "opacity-70"}`} >
        <div className="flex justify-around mb-6 sm:mb-1 items-center ">
          <h1 className="text-center sm:pb-4 sm:pt-1 font-bold text-2xl md:text-3xl tracking-wide">TODO LIST</h1> 
          <div className="flex h-13 items-center">
            <button className="mr-3 rounded-md w-16 bg-blue-800 text-white font-serif text-sm ease-in-out pb-1 sm:py-1" onClick={()=>navigate('/signup')}>Sign in</button>
            <button className="rounded-md w-16 bg-blue-800 text-white ease-in-out font-serif text-sm pb-1 sm:py-1" onClick={()=>navigate('/login')}>Log in</button>
          </div>
        </div>
        <div className="ml-2 mr-4 relative md:px-10 ">
          <div className="flex pb-8"><input className="rounded-md mr-2 md:mr-4 pl-4 pr-16 sm:pr-9 width sm:w-64 black" 
          type="text" name="search"
            placeholder={SearchPlaceHolder} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <img src="Vector.png" onClick={()=>show()} className="w-4 h-5 block absolute top-2.5 sm:top-3 left-36 md:left-64 
            hover:opacity-50 bg-indigo-100 " />
{ searchValue !== ""  &&  <button className="absolute top-2 sm:top-3 left-28  md:left-56 border-none pt-1" 
onClick={()=> cancelSearch()}><img src="cancel.png"/></button>
}            <SelectOpt selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
            <button className="border-none w-12"><img onClick={() => setDarkMode(!darkmode)}
             src={darkmode ? "lightMode.png" : "darkMode.png"} /></button>
          </div>
          
         {search ? (
    searchArray.length > 0 ? searchArray.map((todoSearched, i) => (
        <p key={i} className="overflow-x-scroll">{todoSearched.note} </p>
    )) : <p>No matching results found.</p>
) 
           :
          <ul>
            {(Todos?.length > 0) ? newTodo.map((todo, i) =>
              <li className="flex mb-4 " key={i}>
                <input type="checkbox" name="Todo-List" checked={todo.done} onChange={(e) => checkTodo(e.target.checked, i)} />
                {showEdit === true && i === updateTodo ?  
                <div className="flex justify-between">
                  <div>
                    <input className="w-44 max-w-44 whitespace-nowrap block rounded-md black overflow-x-auto md:min-w-56 pl-3 ml-2"
                     type="text"
                    value={editedValue} placeholder={todo.note} onChange={(e) => handleEdit(e)} />
                  </div>
                  <button className="bg-indigo-600 text-white  font-semibold block rounded-md px-2 py-[0.2]  ml-2 text-center" 
                  onClick={()=>endOfRename(i)}>save</button>
                </div>
                :
                <div className="flex justify-between w-full items-center">
                    <div>
                      <span className={`whitespace-nowrap overflow-x-auto inline-block pl-3 w-full
                       ${todo.done === true ? "line-through text-slate-500" : ""}`}> {todo.note}
                      </span>
                    </div>
                    <div className="flex">
                      <img onClick={()=>renameTodo(i)} className="ml-7 cursor-pointer bg-indigo-400 rounded-full p-1"
                       src="Frame 6.png" />
                      <img onClick={() => deleteTodo(i)} src="trash-svgrepo-com 1.png"
                       className="ml-4 bg-indigo-400 rounded-full p-1 cursor-pointer" />
                    </div>
                </div>
                   }
              </li>
            ) 
            : 
            <p className="translate-y-16"> <img src="detective.png" />No todos</p> }<br/><br/>
          </ul>}
        </div>
        {showOption && (
          <div className="bg-transparent w-full h-full absolute top-0">
            <div id="popUp" className={`absolute z-50 card top-1/4  
              ${darkmode ? "bg-slate-700 text-black" : "bg-gray-300 text-black"} 
              drop-shadow-2xl rounded-xl inset-0 left-1/4 flex flex-col px-2 `}>
              <h2 className={`text-center ${darkmode && "text-white"} pb-1`}>NEW NOTE</h2>
              <input className="block px-3" type="text" name="" id="" placeholder="Input your note..."
                value={inputValue} onChange={addtoTodo} />
              <p>{errorMessage}</p>
              <div className="absolute bottom-2 flex justify-between w-full">
                <div>
                  <button onClick={removeOpt} className="bg-black text-indigo-100 px-2 rounded-md">CANCEL</button>
                </div>
                <div className="mr-5 text-white bg-indigo-800 px-2 rounded-md ">
                <button className="border-none" onClick={pushtoTodo}>APPLY</button></div>
              </div>
            </div>
          </div>
        )}

                  <div className="absolute bottom-30  w-full pt-5 ">
                    <img src="button.png" alt="add-button" onClick={addButton} className="block w-10 translate-x-52" />
                    <p className="text-purple-700 text-center py-5">{quote}</p>
                  </div>
      </div>
    </>
  )
}

export default App

