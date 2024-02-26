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
import AddBlog from './pages/AddBlog.jsx';
import AddBlogCat from './pages/AddBlogCat.jsx';
import AddColor from './pages/AddColor.jsx';
import AddCategory from './pages/AddCategory.jsx';
import AddBrand from './pages/AddBrand.jsx';
import AddProduct from './pages/AddProduct.jsx';
import CouponList from './pages/CouponList.jsx';
import AddCoupon from './pages/AddCoupon.jsx';
import ViewInquiries from './pages/ViewInquiries.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='inquiries' element={<Inquiries />} />              {/* the path should be same as the MainLayout key values */}             {/* the path should be same as the MainLayout key values */}
          <Route path='view-inquiries/:id' element={<ViewInquiries />} />              {/* the path should be same as the MainLayout key values */}             {/* the path should be same as the MainLayout key values */}
          <Route path='blog-list' element={<BlogList />} />               {/* the path should be same as the MainLayout key values */}
          <Route path='add-blog' element={<AddBlog />} />                 {/* the path should be same as the MainLayout key values */}
          <Route path='add-blog/:id' element={<AddBlog />} />      {/* both update function and create function are in the AddBlog */}           {/* the path should be same as the MainLayout key values */}
          <Route path='coupon-list' element={<CouponList />} />           {/* the path should be same as the MainLayout key values */}
          <Route path='coupon' element={<AddCoupon />} />                 {/* the path should be same as the MainLayout key values */}
          <Route path='coupon/:id' element={<AddCoupon />} />      {/* both update function and create function are in the AddCoupon */}           {/* the path should be same as the MainLayout key values */}
          <Route path='blog-category-list' element={<BlogCatList />} />   {/* the path should be same as the MainLayout key values */}
          <Route path='blog-category' element={<AddBlogCat />} />         {/* the path should be same as the MainLayout key values */}
          <Route path='blog-category/:id' element={<AddBlogCat />} />  {/* both update function and create function are in the AddBlogCat */}       {/* the path should be same as the MainLayout key values */}
          <Route path='orders' element={<Orders />} />                    {/* the path should be same as the MainLayout key values */}
          <Route path='customers' element={<Customers />} />              {/* the path should be same as the MainLayout key values */}
          <Route path='color-list' element={<ColorList />} />             {/* the path should be same as the MainLayout key values */}
          <Route path='color' element={<AddColor />} />                   {/* the path should be same as the MainLayout key values */}
          <Route path='color/:id' element={<AddColor />} />       {/* both update function and create function are in the AddColor */}      {/* the path should be same as the MainLayout key values */}
          <Route path='category-list' element={<CategoryList />} />       {/* the path should be same as the MainLayout key values */}
          <Route path='category' element={<AddCategory />} />             {/* the path should be same as the MainLayout key values */}
          <Route path='category/:id' element={<AddCategory />} />   {/* both update function and create function are in the AddCategory */}  {/* the path should be same as the MainLayout key values */}
          <Route path='brand-list' element={<BrandList />} />             {/* the path should be same as the MainLayout key values */}
          <Route path='brand' element={<AddBrand />} />                   {/* the path should be same as the MainLayout key values */}
          <Route path='brand/:id' element={<AddBrand />} />   {/* both update function and create function are in the AddBrand */}            {/* the path should be same as the MainLayout key values */}
          <Route path='product-list' element={<ProductList />} />         {/* the path should be same as the MainLayout key values */}
          <Route path='product' element={<AddProduct />} />         {/* the path should be same as the MainLayout key values */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
