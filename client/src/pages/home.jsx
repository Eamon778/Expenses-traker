import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import Model from "./component/model"
import { IoIosAdd } from "react-icons/io";

function Home() {
    const dispatch = useDispatch()
    const { data } = JSON.parse(localStorage.getItem('user'))
    console.log(data.expenses);
    
    const [showModel, setShowModel] = useState(false)
    
    return (
        <div className="bg-black h-screen">
            <div className="md:container mx-auto">
                <h1 className="text-white text-5xl font-bold">Expenses Tracker</h1>
                <div>
                    <button onClick={()=> setShowModel(true)}><IoIosAdd className="text-blue-600 text-5xl" /></button>
                </div>
                <div className="text-white">{data.email}</div>
                <div className="text-white"></div>
            </div>
            <button className="px-2 py-1 m-3 bg-blue-500 rounded-lg text-white" onClick={()=> dispatch(logout())}>logout</button>
            {showModel && <Model onClose={()=> setShowModel(false)} />}
        </div>
    )
}

export default Home