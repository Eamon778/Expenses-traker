import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuthenticated){
            navigate('/')
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Both fields are required");
            return;
         }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", formData);
            setLoading(false);
            dispatch(login(response.data));
            navigate("/");

        } catch (err) {
            setLoading(false);
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Invalid credentials");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="bg-[#051321] h-screen flex justify-center items-center">
            <div className="border-2 bg-[#040f1a] w-96 border-slate-800 rounded-lg p-10">
                <h1 className="text-white text-5xl font-bold">Log in</h1>
                <form onSubmit={handleSubmit} className="text-white">
                    {error && <p className="text-red-500 text-center mt-3 mb-4">{error}</p>}
                    <div className="my-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input type="email" className="bg-black p-2 w-full border border-gray-400 rounded-lg text-white" placeholder="your@email.com" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input type="password" className="bg-black p-2 w-full border border-gray-400 rounded-lg text-white" placeholder="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="bg-white text-black rounded-lg px-4 mt-2 py-2 w-full font-semibold" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <p className="text-center mt-5">Don't have an account? <button className="underline underline-offset-3" onClick={()=> navigate('/register')}>Sign up</button></p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
