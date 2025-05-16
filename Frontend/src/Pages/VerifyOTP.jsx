import React, { useContext, useState } from 'react'
import AuthContainer from '../components/AuthContainer'
import axios from 'axios'
import { UserContextData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const VerifyOTP = () => {
    const [userEmail, setuserEmail] = useContext(UserContextData);
    const navigate = useNavigate();

    const [otp, setOtp] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const OTP = Number(otp);
            console.log(userEmail);
            const data ={
                email:userEmail,
                otp:OTP
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/verifyOTP`,data);
            if (response.status === 200) {
                const data = response.data;
                alert("OTP verified successfully");
                // console.log(data.token);
                navigate('/reset-password')
            } else {
                alert("Invalid OTP");
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            
        }
    }

  return (
    <AuthContainer>
        <div className="head">
            <h1 className="title">Verify OTP</h1>
        </div>
        <form onSubmit={(e)=>{submitHandler(e)}}>
            <h1 className='forget-heading'>Enter the OTP sent to your email</h1>
            <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <input type="number" id="otp" name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter the OTP" required />
            </div>
            <div className="form-group">
                <input type="submit" id="submit" value="Verify OTP" />
            </div>
        </form>
    </AuthContainer>
  )
}

export default VerifyOTP