import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContainer from "../components/AuthContainer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`,userData);

    if (response.status === 201) {
      const data = response.data;
      // alert("User created successfully");
      // console.log(data.token);
      navigate('/')
  
    }

    } catch (error) {
      console.error("Error signing up:", error);
      
    }
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <AuthContainer>
      <div className="head">
        <h1 className="title">Sign up</h1>
      </div>
      <form
        action=""
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
            title="Must contain at least 1 uppercase, 1 number, 1 special character and be 8+ characters long"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <input type="submit" id="submit" value="Create account" />
        </div>
        <div className="form-group">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Signup;
