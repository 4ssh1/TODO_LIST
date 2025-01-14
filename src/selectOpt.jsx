
 function SelectOpt({selectedMode, setSelectedMode}) {
  

  return(
    
      <select name="" id="" className="bg-indigo-500 text-white mr-4 rounded-lg p-2" value={selectedMode}
      onChange={(e)=>setSelectedMode(e.target.value)}>
        <option value="all">ALL</option>
        <option value="complete"> Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
  )
}
     
  export default SelectOpt

