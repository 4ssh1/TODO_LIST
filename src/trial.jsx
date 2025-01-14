import { useState } from "react";
export default function Ant(){
    const [aoo, setAoo]= useState([])
    setAoo("mw")
    console.log(aoo)
    setAoo((prev)=> [...prev, "rydcn"])
    console.log(setAoo)
}