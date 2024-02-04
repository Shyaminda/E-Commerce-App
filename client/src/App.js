import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProducts from './pages/CompareProducts';
import Wishlist from './pages/Wishlist';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import BlogPage from './pages/BlogPage';
import Privacypolicy from './pages/Privacypolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndConditions from './pages/TermAndConditions';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="store" element={<OurStore />} />
          <Route path="product/" element={<Product />} />    {/* product/:id */} 
          <Route path="blogs" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPage />} />
          <Route path="compare-products" element={<CompareProducts />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="privacy-policy" element={<Privacypolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="terms-conditions" element={<TermAndConditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
