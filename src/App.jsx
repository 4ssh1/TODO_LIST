import { useEffect, useState } from "react"
// import "./index.css"
import SelectOpt from "./selectOpt"


function App() {
  const [darkmode, setDarkMode] = useState(false)
  const [Todos, setTodos] = useState([])
  const [showTodo, setShowTodo] = useState([])
  const [showOption, setShowOption] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [editedValue, setEditedValue] = useState("")
  const [search, setSearch] = useState([])
  const [selectedMode, setSelectedMode] = useState("all")
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search note ...")

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("Todo"))
    if (storedTodo && storedTodo.length > 0) {
      setTodos(storedTodo)
    }
  }, [])

  useEffect(() => {
    return localStorage.setItem("Todo", JSON.stringify(Todos))
  }, [Todos])


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
  }


  // function checkTodo( done, index) {
  //   setTodos((prev)=>{
  //     return prev.map((todo,i)=>{
  //       let xyz = {...todo}
  //       if(i==index){
  //         xyz = {...xyz, done}
  //       }
  //      (i === index) ? {...todo, done} : todo 
  //       return xyz
  //     })
  //   })
  // }

  function checkTodo(done, index) {
    const updatedTodos = Todos.map((todo, i) =>
      i === index ? { ...todo, done } : todo
    );
    setTodos(updatedTodos);
    setShowTodo(updatedTodos);
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


  // function pushtoTodo() {
  //   if(inputValue.trim().length==0){
  //     setErrorMessage("Invalid input")
  //   }else{
  //     const newTodo = {note:inputValue, done: false}
  //     setTodos((prev)=>[...prev, newTodo])
  //     setShowOption(false)
  //     setShowTodo(newTodo)
  //   }
  // }

  function deleteTodo(index) {
    const newTodo = Todos.filter((_, i) => {
      return i != index
    })
    setTodos(newTodo)
    setShowTodo(newTodo)
  }

  function searchTodo() {
    const newTodo = [...Todos]
    const filtered = newTodo.filter(element => {
      return element.note.toLowerCase().includes(search.toLowerCase())
    })
    if (filtered) {
      setTodos( filtered)
    }
    else {
      setTodos(newTodo)
    }
    if ( filtered &&search.length === 0) {
      setSearchPlaceholder("No input to search...")
    } else {
      setSearchPlaceholder('Search note ...')
    }
    setSearch([])
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


  return (
    <>
      <div className={`${darkmode ? "bg-slate-900 text-white" : "bg-white"} h-screen w-100% relative 
      ${showOption && "opacity-70"}`} >
        <h2 className="text-center pb-6 pt-1 font-bold text-xl tracking-wide">TODO LIST</h2>
        <div className="px-14">
          <div className="flex pb-3"><input className="rounded-md mr-4 pl-5 pr-9 w-64" type="text" name="search"
            placeholder={searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} />
            <img src="Vector.png" onClick={searchTodo} className="w-3 h-5 block absolute top-16 left-64 md:left-72 hover:opacity-50 " />
            <SelectOpt selectedMode={selectedMode} setSelectedMode={setSelectedMode} Todos={showTodo} setTodos={setShowTodo} />
            <button className="border-none"><img onClick={() => setDarkMode(!darkmode)}
             src={darkmode ? "lightMode.png" : "darkMode.png"} /></button>
          </div>
          <ul>
            {(Todos?.length > 0) ? newTodo.map((todo, i) =>
              <li className="flex mb-2" key={i}>
                <input type="checkbox" name="Todo-List" checked={todo.done} onChange={(e) => checkTodo(e.target.checked, i)} />
                {showEdit === true ? <div><input className="w-32" type="text" value={editedValue}
                 onChange={(e) => setEditedValue(e.target.value)} />
                  <button>Save</button></div> :
                   <p className={`min-w-64 md:min-w-80 pl-3 ${todo.done === true ? "line-through text-slate-500" : ""}`}> {todo.note}</p>}
                <img onClick={() => setShowEdit(true)} className="ml-5 cursor-pointer bg-indigo-400 rounded-full p-1" src="Frame 6.png" />
                <img onClick={() => deleteTodo(i)} src="trash-svgrepo-com 1.png" className="ml-2 bg-indigo-400 rounded-full p-1 cursor-pointer" />
              </li>
            ) : <p className="translate-y-16"> <img src="detective.png" />No todos</p>}
          </ul>
        </div>
        <img className="absolute block w-10 bottom-10 right-11" src="button.png" alt="add-button" onClick={addButton} />
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
                <div className="mr-5 text-white bg-indigo-800 px-2 rounded-md"><button onClick={pushtoTodo}>APPLY</button></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App

