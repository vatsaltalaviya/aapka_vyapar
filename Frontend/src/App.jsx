import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/login'
import Signup from './Pages/signup'
import Home from './Pages/Home'
import ForgotPassword from './Pages/ForgotPassword'
import VerifyOTP from './Pages/VerifyOTP'
import NewPassword from './Pages/NewPassword'

const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-email" element={<VerifyOTP />} />
    <Route path="/reset-password" element={<NewPassword />} />
   </Routes>
   </>
  )
}

export default App
