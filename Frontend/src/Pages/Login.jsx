import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContainer from '../components/AuthContainer'
import axios from 'axios'

const Login = () => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
       try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,userData);

        if (response.status === 200) {
            const data = await response.data
           navigate('/');
        //    console.log(data.token);
        } 
       } catch (error) {
        console.error('Error logging in:', error);
       }

        setEmail('')
        setPassword('')
    }

  return (
    <AuthContainer>
        <div className="head">
            <h1 className="title">Login</h1>
             </div>
            <form  onSubmit={(e)=>{submitHandler(e)}}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required />
                </div>
                <div className="form-group">
                    <input type="submit" id="submit" value="login your account" />
                </div>
                <div className="form-group">
                     <Link className='forget-password' to="/forgot-password">Forget your password?</Link>
                </div>
                <div className="form-group">
                    <p>Don't have any account? <Link to="/signup">Register here</Link></p>
                </div>
            </form>
    </AuthContainer>    
  )
}

export default Login