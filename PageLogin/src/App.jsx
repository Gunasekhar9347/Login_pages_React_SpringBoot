import React from 'react'
import LoginPg from './Components/LoginPg';
import RegisterPg from './Components/RegisterPg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPg/>} />
        <Route path="/login" element={<LoginPg/>} />
        <Route path="/register" element={<RegisterPg/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}


