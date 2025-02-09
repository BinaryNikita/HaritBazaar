import React, { useState } from 'react';
import { api } from '../../axios'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { login } from '../../Redux-Config/UserSlice';
import Google from './Google';
import './Sign-Up.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (!validatePassword(password)) {
        return false;
      }
      const response = await api.post('/user/sign-up', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        dispatch(login(response.data));
        navigate('/');
      }
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  };

  const validatePassword = (password) => {
    let passwordError = document.getElementById('su-passwordError');
    if (password.length < 6) {
      passwordError.innerText = "Password must be at least 6 characters";
      return false;
    } else {
      passwordError.innerText = "";
      return true;
    }
  };

  return (
    <div className="eco-login-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="si-eco-card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: '400px', backgroundColor: '#536B24', width: '350px' }}>
      <h1 className="text-center text-white mb-4 d-inline h1 " style={{color: '#6C872F'}}>Sign Up 
      </h1>
        <img src='/images/logobg.png' height={'100px'} width={'120px'} style={{marginLeft: '10%', borderRadius:'50px'}}/>
        <form onSubmit={handleSignUp} className="d-flex flex-column align-items-center">
          <div className="mb-3 w-100">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input
              type="text"
              className="form-control su-input rounded-pill"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control su-input rounded-pill"
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
              className="form-control su-input rounded-pill"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => validatePassword(e.target.value)}
              required
            />
            <small id='su-passwordError' className='text-danger'></small>
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="d-grid">
            <button type="submit" className="btn su-btn-light rounded-pill text-dark" style={{ width: '100%' }}>
              Sign Up
            </button>
            <div className=''>
              <Google setError={setError} /> 
            </div>
            <p><strong>{error}</strong></p>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p className="text-white-50">
            Already have an account? <Link to="/user/sign-in" className="text-white">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
