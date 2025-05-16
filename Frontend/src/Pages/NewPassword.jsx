import React, { useContext, useState } from 'react'
import AuthContainer from '../components/AuthContainer'
import axios from 'axios';
import { UserContextData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {

    const [NewPassword, setNewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
     const [userEmail] = useContext(UserContextData);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (NewPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log(userEmail);
        const userData ={
            email:userEmail,
            newPassword:NewPassword,

        }
        console.log(userData);
        if(NewPassword === confirmPassword){
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/resetPassword`,userData);
            if (response.status === 200) {
                const data = response.data;
                alert("Password reset successfully");
                // console.log(data.token);
                navigate('/');
            } else {
                alert("Error resetting password");
            }
        }
       
    }
  return (
    <AuthContainer>
        <div className="head">
            <h1 className="title">New Password</h1>
        </div>
        <form onSubmit={(e)=>{submitHandler(e)}}>
            <h1 className='forget-heading'>Create a new password</h1>
            <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input type="password" id="password" name="password" value={NewPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter your new password" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="Confirm-password" name="Confirm-password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)} placeholder="Enter your new password" required />
            </div>
            <div className="form-group">
                <input type="submit" id="submit" value="Reset Password" />
            </div>
        </form>
    </AuthContainer>
  )
}

export default NewPassword