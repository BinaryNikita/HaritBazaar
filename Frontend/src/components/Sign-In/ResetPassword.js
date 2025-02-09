import React, { useState, useEffect } from "react";

import { api } from "../../axios"; 
import { useLocation, useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); 

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleOtpChange = (e) => setOtp(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/reset-password", {
        email,
        password,
        otp,
      });
      console.log(password);
      setMessage(response.data.message);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/user/sign-in"); 
        }, 2000);
      } 
      
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "Error resetting password."
      );
    }
  };

  useEffect(() => {
    if (!email) {
      setMessage("Invalid or expired email.");
    }
  }, [email]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card reset-password-card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', backgroundColor: '#28a745', color: '#fff' }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP:</label>
            <input
              type="text"
              id="otp"
              className="form-control"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-light w-100">
            Reset Password
          </button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
