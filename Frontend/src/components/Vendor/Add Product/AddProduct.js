import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../../axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../FrontPage/Header/Header';
import Footer from '../../FrontPage/Footer';

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const name = useRef();
  const description = useRef();
  const price = useRef();
  const categoryName = useRef();
  const images = useRef();
  const carbonFootprint = useRef();
  const isOrganic = useRef();
  const isRecycled = useRef();
  const type = useRef();
  const discount = useRef();
  const quantity = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await sendData();
      if (response.data.operation) navigate('/');
      else console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendData = async () => {
    const formData = new FormData();
    formData.append('name', name.current.value);
    formData.append('description', description.current.value);
    formData.append('price', price.current.value);
    formData.append('category_id', categoryName.current.value);
    for (let i = 0; i < images.current.files.length; i++) formData.append('image', images.current.files[i]);
    formData.append('carbonFootprint', carbonFootprint.current.value);
    formData.append('isOrganic', isOrganic.current.checked);
    formData.append('isRecycled', isRecycled.current.checked);
    formData.append('type', type.current.value);
    formData.append('discount', discount.current.value);
    formData.append('quantity', quantity.current.value);
    
    return await api.post("/product/add-product", formData, { headers: { Authorization: token } });
  };

  useEffect(() => {
    const response = getCategory().then((response) => {
      if (response.data.success) setCategory(response.data.category);
    });
  }, []);

  const getCategory = async () => await api.get("/category/get-all", { headers: { Authorization: token } });

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header text-white bg-success">
            <h2 className="text-center mb-0 text-dark">Add New Eco-Friendly Product</h2>
          </div>
          <div className="card-body bg-light">
            <form onSubmit={handleSubmit}>
              {/* PRODUCT NAME */}
              <div className="form-group">
                <label>Product Name</label>
                <input
                  ref={name}
                  type="text"
                  className="form-control"
                  placeholder="Enter product name"
                  style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  ref={description}
                  className="form-control"
                  rows="3"
                  placeholder="Describe the eco-friendly features"
                  style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                ></textarea>
              </div>

              {/* PRICE AND CATEGORY */}
              <div className="form-row">
                {/* PRICE */}
                <div className="form-group col-md-6">
                  <label>Price</label>
                  <input
                    ref={price}
                    type="number"
                    className="form-control"
                    placeholder="e.g., 29.99"
                    style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                    required
                  />
                </div>

                {/* CATEGORY */}
                <div className="form-group col-md-6">
                  <label>Category</label>
                  <select
                    ref={categoryName}
                    className="form-control"
                    style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                  >
                    {category?.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* IMAGE */}
              <div className="form-group">
                <label>Product Images</label>
                <input
                  ref={images}
                  type="file"
                  className="form-control-file"
                  multiple
                  max="10"
                  style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                />
                <small className="form-text text-muted">
                  Upload images showcasing the product's eco-friendly aspects (max 10).
                </small>
              </div>

              {/* CARBON FOOTPRINT */}
              <div className="form-group">
                <label>Carbon Footprint (kg CO₂e)</label>
                <input
                  ref={carbonFootprint}
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="e.g., 2.5"
                  style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                />
              </div>

              {/* ORGANIC / RECYCLABLE */}
              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="form-check">
                    <input
                      ref={isOrganic}
                      type="checkbox"
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      Organic Product
                    </label>
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="form-check">
                    <input
                      ref={isRecycled}
                      type="checkbox"
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      Made from Recycled Materials
                    </label>
                  </div>
                </div>
              </div>

              {/* PRODUCT TYPE */}
              <div className="form-group">
                <label>Product Type</label>
                <select ref={type} className="form-control" style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}>
                  <option>Eco-Friendly</option>
                  <option>Reusable</option>
                  <option>Biodegradable</option>
                  <option>Sustainable</option>
                </select>
              </div>

              {/* QUANTITY AND DISCOUNT */}
              <div className="form-row">
                {/* QUANTITY */}
                <div className="form-group col-md-6">
                  <label>Quantity Available</label>
                  <input
                    ref={quantity}
                    type="number"
                    className="form-control"
                    placeholder="e.g., 100"
                    style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                    required
                  />
                </div>

                {/* DISCOUNT */}
                <div className="form-group col-md-6">
                  <label>Discount (%)</label>
                  <input
                    ref={discount}
                    type="number"
                    step="0.01"
                    className="form-control"
                    placeholder="e.g., 15"
                    style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '5px' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-block text-white bg-success">
                Add Eco-Friendly Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AddProduct;
