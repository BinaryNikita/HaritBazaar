import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Sign-Up/Sign-up'
import SignIn from './components/Sign-In/Sign-in';
import ResetPassword from './components/Sign-In/ResetPassword';  // Import ResetPassword component
import ForgotPassword from './components/Sign-In/ForgotPassword';
import HomePage from './components/FrontPage/HomePage';
import Cart from './components/Cart/cart';
import VendorPage from './components/Vendor/VendorPage';
import BlogManager from './components/Blog/Blog';
import ProductDetail from './components/Product/ProductDetails';
import DecideUser from './components/decideUser';
import ProductsPage from './components/Product/Products';
import AddProduct from './components/Vendor/Add Product/AddProduct';
import PlaceOrder from './components/Order/PlaceOrder';
import OrderRequest from './components/Vendor/Order Requests/OrderRequests';
import MyProducts from './components/Vendor/My Products/MyProducts'
import EditProduct from './components/Vendor/Edit Product/EditProduct';
import { Auth } from './components/Auth/Authenticate';
import AboutUsPage from './components/FrontPage/AboutUs';
import Order from './components/Order/Order';
import CarbonFootprintPage from './components/Product/CarbonFootprintCounter';
import Categories from './components/Admin/Category/Categories'
import AdminProduct from './components/Admin/Product/admin.product';
import Wishlist from './components/Wishlist/Wishlists';
import WishlistProducts from './components/Wishlist/WishlistProducts';
import OrderForAdmin from './components/Admin/Orders/Order.Admin';
import UserDetails from './components/Admin/See Details/UserDetails';
import VendorDetail from './components/Admin/See Details/VendorDetails';
import ManageUsers from './components/Admin/Users/ManageUser';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFailed from './components/Payment/PaymentFailed';
import MakePayment from './components/Payment/MakePayment';
import OrderDetail from './components/Order/OrderDetail';
import AddProductByFile from './components/Vendor/Add Product/AddProductByExcel';
function App() {
  return <>
    <Routes>

      {/* USER ROUTES */}
      <Route path="/" element={<><DecideUser /></>} />
      <Route path="product/all-products" element={<ProductsPage />} />
      <Route path="user/sign-in" element={<SignIn />} />
      <Route path="user/sign-up" element={<SignUp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="cart/get-cart" element={<Auth>< Cart /></Auth>} />
      <Route path="product/:productId" element={< ProductDetail />} />
      <Route path="blogs/all-blogs" element={< BlogManager />} />
      <Route path="about-us" element={<AboutUsPage />} />
      <Route path="orders" element={<Auth><Order /></Auth>} />
      <Route path="place-order/:productId" element={< PlaceOrder />} />
      <Route path='orders/orderDetail' element={<Auth><OrderDetail/></Auth>}/>
      <Route path="carbon" element={<Auth><CarbonFootprintPage /></Auth>} />
      <Route path="vendor/new-vendor" element={<Auth>< VendorPage /></Auth>} />

      <Route path="manage-products" element={<Auth>< MyProducts /></Auth>} />
      <Route path="vendor-order" element={<Auth>< OrderRequest /></Auth>} />
      <Route path="manage-products/:productId" element={<Auth> <EditProduct /></Auth>} />
      <Route path="product/addProduct" element={<Auth>< AddProduct /></Auth>} />
      <Route path="add-product-by-file" element={<Auth>< AddProductByFile /></Auth>} />

      <Route path='wishlist' element={<Auth><Wishlist /></Auth>} />
      <Route path='wishlist/products/:productId' element={<Auth><WishlistProducts /></Auth>} />

      {/* ADMIN ROUTES */}
      <Route path='admin/manage-category' element={<Auth><Categories /></Auth>} />
      <Route path='admin/manage-products' element={<Auth><AdminProduct /></Auth>} />
      <Route path='admin/manage-orders' element={<Auth><OrderForAdmin /></Auth>} />
      <Route path='admin/manage-users' element={<Auth><ManageUsers /></Auth>} />
      <Route path='admin/userDetail/:userId' element={<Auth><UserDetails /></Auth>} />
      <Route path='admin/vendorDetail/:vendorId' element={<Auth><VendorDetail /></Auth>} />

      <Route path='make-payment/:amount' element={<MakePayment/>}/>
      <Route path='success' element={<PaymentSuccess/>}/>
      <Route path='failed' element={<PaymentFailed/>}/>

    </Routes>
  </>
}
export default App;
