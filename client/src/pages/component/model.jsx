import { useState } from "react"
import axios from "axios"

function Model({onClose}) {
    const { data } = JSON.parse(localStorage.getItem('user'))
    const userId = data._id
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleAddExpense = async (e)=>{
        e.preventDefault()

        try {
            const payload = { description, amount: parseFloat(amount), date };
            const response = await axios.post(`http://localhost:3000/api/users/${userId}/expenses`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.success) {
                alert('Expense added successfully!');
                setDescription('');
                setAmount('');
                setDate('');
            } else {
                alert('Failed to add expense: ' + response.data.message);
            }
        } catch (err) {
            console.error('Error adding expense:', err);
            alert('An error occurred while adding the expense.');
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-green-600">
                <form onSubmit={handleAddExpense}>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" value={description} onChange={(e)=> setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount:</label>
                        <input type="number" name="amount" value={amount} onChange={(e)=> setAmount(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input type="date" name="date" value={date} onChange={(e)=> setDate(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Add Salary</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Model