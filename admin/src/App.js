import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import MainLayout from "./components/MainLayout.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import Inquiries from './pages/Inquiries.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogCatList from './pages/BlogCatList.jsx';
import Orders from './pages/Orders.jsx';
import Customers from './pages/Customer.jsx';
import ColorList from './pages/ColorList.jsx';
import CategoryList from './pages/CategoryList.jsx';
import BrandList from './pages/BrandList.jsx';
import ProductList from './pages/ProductList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='inquiries' element={<Inquiries />} />              {/* the path should be same as the MainLayout key values */}
          <Route path='blog-list' element={<BlogList />} />               {/* the path should be same as the MainLayout key values */}
          <Route path='blog-category-list' element={<BlogCatList />} />   {/* the path should be same as the MainLayout key values */}
          <Route path='orders' element={<Orders />} />                    {/* the path should be same as the MainLayout key values */}
          <Route path='customers' element={<Customers />} />              {/* the path should be same as the MainLayout key values */}
          <Route path='color-list' element={<ColorList />} />             {/* the path should be same as the MainLayout key values */}
          <Route path='category-list' element={<CategoryList />} />       {/* the path should be same as the MainLayout key values */}
          <Route path='brand-list' element={<BrandList />} />             {/* the path should be same as the MainLayout key values */}
          <Route path='product-list' element={<ProductList />} />         {/* the path should be same as the MainLayout key values */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
