import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../axios'; 


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/request-password-reset', { email });
      setMessage(response.data.message);

      if (response.status === 200) {
        navigate(`/reset-password?email=${email}`);
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error sending OTP.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', backgroundColor: '#28a745', color: '#fff' }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-light btn-lg">Send OTP</button>
          </div>
        </form>
        {message && <div className="mt-3 text-center">{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
