import React, { useContext, useState } from 'react'
import AuthContainer from '../components/AuthContainer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContextData } from '../context/UserContext';



const ForgotPassword = () => {
 const [userEmail, setuserEmail] = useContext(UserContextData)
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/sendOtp`,{email});
            if (response.status === 200) {
                const data = await response.data;
                setuserEmail(email);
                console.log(userEmail);
                navigate('/verify-email');
                // Navigate to the next page or show a success message
            }
        }
        catch (error) {
            console.error('Error sending OTP:', error);
        }
        setEmail('');
    }

  return (
    <AuthContainer>
        <div className="head">
            <h1 className="title">Forgot Password</h1>
        </div>
        <form onSubmit={(e)=>{submitHandler(e)}}>
            <h1 className='forget-heading'>Reset your password with your email</h1>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div className="form-group">
                <input type="submit" id="submit" value="Verify Email" />
            </div>
        </form>
    </AuthContainer>
  )
}

export default ForgotPassword