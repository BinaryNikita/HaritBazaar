import React, { useState } from 'react';
import { api } from '../../axios';  
import { Link, useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';
import { login } from '../../Redux-Config/UserSlice';
import GoogleLogin from './GoogleSignIn';
import './Sign-in.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/sign-in', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.success) {
          navigate('/');
          dispatch(login(response.data));
        }
        else {
          setError(response.data.message);
        }
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="eco-login-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="si-eco-card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: '400px', backgroundColor: '#536B24', width: '350px' }}>
        <h1 className="text-center text-white mb-4 d-inline h1 " style={{color: '#6C872F'}}>Sign In 
        </h1>
          <img src='/images/logobg.png' height={'100px'} width={'120px'} style={{marginLeft: '10%', borderRadius:'50px'}}/>
        <form onSubmit={handleSignIn} className="d-flex flex-column align-items-center">
          <div className="mb-3 w-100">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control si-eco-input rounded-pill"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control si-eco-input rounded-pill"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="d-grid">
            <button type="submit" className="btn si-eco-btn-light rounded-pill text-dark" style={{ width: '100%' }}>
              Sign In
            </button>
            <div>
              <GoogleLogin setError={setError} />
            </div>
          </div>
        </form>
        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="text-white">
            Forgot your password?
          </Link>
        </div>
        <div className="mt-3 text-center">
          <p className="text-white-50">
            Don't have an account? <Link to="/user/sign-up" className="text-white">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
