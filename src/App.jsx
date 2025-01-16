import { useEffect, useState } from "react"
// import "./index.css"
import SelectOpt from "./selectOpt"


function App() {
  const [darkmode, setDarkMode] = useState(false)
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
 

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("Todo"))
    if (storedTodo && storedTodo.length > 0) {
      setTodos(storedTodo)
    }
  }, [])

  useEffect(() => {
    return localStorage.setItem("Todo", JSON.stringify(Todos))
  }, [Todos])

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
        i === index ? { ...todo, note:editedValue } : todo
      );
      setTodos(updatedTodos)
      setShowEdit(false)
      setEditedValue("")
    }

  return (
    <>
      <div className={`${darkmode ? "bg-slate-900 text-white" : "bg-white"} h-screen w-100% relative pt-5
      ${showOption && "opacity-70"}`} >
        <h1 className="text-center pb-4 pt-1 font-bold md:text-3xl tracking-wide">TODO LIST</h1>
        <div className="ml-2 mr-4 relative md:px-10 ">
          <div className="flex pb-8"><input className="rounded-md mr-4 pl-5 pr-9 w-44 md:w-64" type="text" name="search"
            placeholder={SearchPlaceHolder} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <img src="Vector.png" onClick={()=>show()} className="w-4 h-5 block absolute top-3 left-36 md:left-64 hover:opacity-50 bg-indigo-100 " />
{ searchValue !== ""  &&  <button className="absolute top-3 left-28  md:left-56 border-none pt-1" onClick={()=> cancelSearch()}><img src="cancel.png"/></button>
}            <SelectOpt selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
            <button className="border-none w-12"><img onClick={() => setDarkMode(!darkmode)}
             src={darkmode ? "lightMode.png" : "darkMode.png"} /></button>
          </div>
         {search ? (
    searchArray.length > 0 ? searchArray.map((todoSearched, i) => (
        <li key={i}>{todoSearched.note}</li>
    )) : <p>No matching results found.</p>
) 
           :
          <ul className="max-w-90">
            {(Todos?.length > 0) ? newTodo.map((todo, i) =>
              <li className="flex mb-4 " key={i}>
                <input type="checkbox" name="Todo-List" checked={todo.done} onChange={(e) => checkTodo(e.target.checked, i)} />
                {showEdit === true && i === updateTodo ?  <div>
        <input className="w-32 min-w-36 md:min-w-56 pl-3 ml-2" type="text" value={editedValue} placeholder={todo.note}
          onChange={(e) => handleEdit(e)} />
       <button className="bg-indigo-600 text-white  rounded-md px-2 md:px-4 ml-2 text-center" onClick={()=>endOfRename(i)}>update</button>
       </div>:
                   <p className={`min-w-52 md:min-w-80 pl-3 ${todo.done === true ? "line-through text-slate-500" : ""}`}> {todo.note}</p>}
                <img onClick={()=>renameTodo(i)} className="ml-7 cursor-pointer bg-indigo-400 rounded-full p-1" src="Frame 6.png" />
                <img onClick={() => deleteTodo(i)} src="trash-svgrepo-com 1.png" className="ml-4 bg-indigo-400 rounded-full p-1 cursor-pointer" />
              </li>
            ) : <p className="translate-y-16"> <img src="detective.png" />No todos</p>}
          </ul>}
        </div>
        {showOption && (
          <div className="bg-transparent w-full h-full absolute top-0">
            <div id="popUp" className={`absolute z-50 card top-1/4  
              ${darkmode ? "bg-slate-700 text-black" : "bg-gray-300 text-black"} drop-shadow-2xl rounded-xl inset-0 left-1/4 flex flex-col px-2`}>
              <h2 className={`text-center ${darkmode && "text-white"} pb-1`}>NEW NOTE</h2>
              <input className="block px-3" type="text" name="" id="" placeholder="Input your note..."
                value={inputValue} onChange={addtoTodo} />
              <p>{errorMessage}</p>
              <div className="absolute bottom-2 flex justify-between w-full">
                <div><button onClick={removeOpt} className="bg-black text-indigo-100 px-2 rounded-md">CANCEL</button></div>
                <div className="mr-5 text-white bg-indigo-800 px-2 rounded-md"><button className="border-none" onClick={pushtoTodo}>APPLY</button></div>
              </div>
            </div>
          </div>
        )}
                <img className="absolute block w-10 bottom-20 md:bottom-14 right-16" src="button.png" alt="add-button" onClick={addButton} />
      </div>
    </>
  )
}

export default App

