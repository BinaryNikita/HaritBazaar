import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { jwtDecode } from 'jwt-decode';
import TermsPage from './Terms';
import './CreateVendor.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux-Config/UserSlice';
let token;
const getUserIdFromToken = () => {
  token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id;
  }
  return null;
};

// THIS PAGE IS NOT IN WORK

const CreateVendor = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.User.user);
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState({
    userId: getUserIdFromToken(),
    businessName: '',
    businessEmail: '',
    phoneNumber: '',
    businessAddress: '',
    productCategories: '',
    shippingMethod: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(vendorData)
      const response = await api.post('/vendor/new-vendor', vendorData, { headers: { Authorization: token } });
      if(response.data.operation){
        console.log(response.data);
        setSuccess(response.data.message);
        setError('');
        // user.role = "vendor";
        dispatch(login({user:{name: user.name, email: user.email, _id: user._id, role: "vendor"}, token: localStorage.getItem('token')}))
        navigate("/")

      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  useEffect(() => {
    console.log("rendered")
    getUserIdFromToken();
  }, []);

  return (
    <>
      <TermsPage />
      <div className="container">
        <h2 className="text-center mb-4 text-success c-v-title fw-bold">Create New Vendor</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        {success && <p className="alert alert-success">{success}</p>}

        <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded vendor-form bg-light">
          <input type="hidden" name="user_id" value={vendorData.userId} />

          <div className="form-group">
            <label htmlFor="businessName" className="text-success">Business Name:</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={vendorData.businessName}
              onChange={handleChange}
              required
              className="form-control mb-3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessEmail" className="text-success">Business Email:</label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={vendorData.businessEmail}
              onChange={handleChange}
              className="form-control mb-3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="text-success">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={vendorData.phoneNumber}
              onChange={handleChange}
              required
              className="form-control mb-3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessAddress" className="text-success">Business Address:</label>
            <input
              type="text"
              id="businessAddress"
              name="businessAddress"
              value={vendorData.businessAddress}
              onChange={handleChange}
              required
              className="form-control mb-3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="productCategories" className="text-success">Product Categories (comma separated):</label>
            <input
              type="text"
              id="productCategories"
              name="productCategories"
              value={vendorData.productCategories}
              onChange={handleChange}
              className="form-control mb-3"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="shippingMethod" className="text-success">Shipping Method:</label>
            <input
              type="text"
              id="shippingMethod"
              name="shippingMethod"
              value={vendorData.shippingMethod}
              onChange={handleChange}
              className="form-control mb-3"
            />
          </div>

          <button type="submit" className="btn btn-create-vendor">
            Create Vendor
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateVendor;
