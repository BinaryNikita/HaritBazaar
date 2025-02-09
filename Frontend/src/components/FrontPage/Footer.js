import React from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container text-center container-fluid p-3 bg-success mt-3">
      <Link className="nav-link text-light" to="/about-us">
        Who we are?
      </Link>
      <p className='text-white'>© 2025 HaritBazr. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
