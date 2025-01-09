import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"

function Home() {
    const dispatch = useDispatch()

    return (
        <div>
            <div>Home</div>
            <button className="px-2 py-1 m-3 bg-blue-500 rounded-lg text-white" onClick={()=> dispatch(logout())}>logout</button>
        </div>
    )
}

export default Home