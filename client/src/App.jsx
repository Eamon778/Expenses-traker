import React from "react"
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./protectedRoute"
import LoginPage from "./auth/LoginPage"
import RegisterPage from "./auth/RegisterPage"
import Home from './pages/home'

function App() {

  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}

export default App
