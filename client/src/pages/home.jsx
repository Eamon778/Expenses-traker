import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Model from "./component/model";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";

function Home() {
    const dispatch = useDispatch();
    const userData = localStorage.getItem('user');
    const { data } = userData ? JSON.parse(userData) : { data: {} };
    const [showModel, setShowModel] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState('')
    const [error, setError] = useState("");

    const getExpenses = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/users/${data._id}/expenses`);
            if (response.data.success) {
                setExpenses(response.data.expenses);
            } else {
                setError(response.data.message || "Failed to fetch expenses");
            }
        } catch (error) {
            setError(error.message || "An error occurred while fetching expenses");
        }
    };

    useEffect(() => {
        if (data && data._id) {
            getExpenses();
        }
    }, [data._id]);

    useEffect(() => {
        if (data && data._id) {
            getExpenses();
        }
    }, [showModel]);

    if (!data) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="bg-black h-screen">
            <div className="md:container mx-auto flex flex-col items-center">
                <h1 className="text-white text-5xl font-bold">Expenses Tracker</h1>
                <p className="text-white text-4xl py-9">Amount left: 0</p>
                <div className="flex">
                    <button className="text-white flex items-center" onClick={() => setShowModel(true)}>Add Salary<IoIosAdd className="text-blue-600 text-3xl" /></button>
                    <button className="text-red-600 flex items-center" onClick={() => setShowModel(true)}>Add Expense<IoIosAdd className="text-blue-600 text-3xl" /></button>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="">
                    <ul className="w-96">
                        {expenses.length ? (
                            expenses.map((expense, index) => (
                                <li key={index} className="text-white flex justify-evenly border-b border-gray-500">
                                    <span>{expense.description}</span> <span>${expense.amount}</span>
                                </li>
                            ))
                        ) : (
                            <div className="text-gray-500">No expenses to show</div>
                        )}
                    </ul>
                </div>
            </div>
            <button
                className="px-2 py-1 m-3 bg-blue-500 rounded-lg text-white"
                onClick={() => dispatch(logout())}
            >
                Logout
            </button>
            {showModel && <Model onClose={() => setShowModel(false)} />}
        </div>
    );
}

export default Home;