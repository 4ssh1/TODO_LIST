
 function SelectOpt({selectedMode, setSelectedMode}) {
  

  return(
    
      <select name="" id="" className="bg-indigo-500 text-white  rounded-lg mr-2 w-20 md:w-32" value={selectedMode}
      onChange={(e)=>setSelectedMode(e.target.value)}>
        <option value="all">ALL</option>
        <option value="complete"> Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
  )
}
     
  export default SelectOpt

