import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12 text-center p-5 hero-background">
          <h1 className="hero-title text-dark">Healthy Nature, Healthy Body</h1>
          <p className="hero-subtitle text-light">Explore our eco-friendly products</p>
          <Link className="btn hero-btn w-100 fw-bold p-2" to="/product/all-products">
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
