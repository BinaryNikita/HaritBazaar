import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../Redux-Config/UserSlice';
import './Header.css';

const Header = () => {
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);
  let role = useSelector(state => state.User.user.role);
  const dispatch = useDispatch();
  if (!role) role = "user";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-header">
      <div className="container-fluid mt-0 mb-0 pb-1 pt-1">
        {/* Logo / Brand */}
        <Link className="navbar-brand custom-link" to="/">
          <img src="images/logo.png" alt="logo" width="110" height="130" style={{borderRadius:'50%'}}/>
          <span  style={{fontSize:'1.5rem', color:'#76990B'}}>HaritBazaar</span>
        </Link>

        {/* Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav" style={{color:'#76990B'}}>
            {/* User Role Navigation */}
            {role === "user" && (
              <>
                <li className="nav-item"><Link className="nav-link custom-link" style={{color:'#76990B'}} to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" style={{color:'#76990B'}} to="/product/all-products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" style={{color:'#76990B'}} to="/orders">Orders</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" style={{color:'#76990B'}} to="/wishlist">WishList</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" style={{color:'#76990B'}} to="/cart/get-cart">Cart</Link></li>
              </>
            )}

            {role === "vendor" && (
              <>
                <li className="nav-item"><Link className="nav-link custom-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/product/addProduct">Add Product</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/vendor-order">Orders</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/manage-products">My Products</Link></li>
              </>
            )}

            {role === "admin" && (
              <>
                <li className="nav-item"><Link className="nav-link custom-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/admin/manage-category">Add Product</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/admin/manage-products">Orders</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/admin/manage-orders">My Products</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/admin/manage-users">Users</Link></li>
              </>
            )}

            {/* Logged-in & Auth Links */}
            {isLoggedIn ? (
              <>
                {role === "user" && (
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/vendor/new-vendor">Become a seller?</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/" onClick={() => dispatch(logOut())}>Log-out</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link custom-link" to="/user/sign-in">Sign-in</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/user/sign-up">Sign-up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
