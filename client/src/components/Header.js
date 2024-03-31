import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from "../features/products/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [totalAmount, setTotalAmount] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [productOptions, setProductOptions] = useState([]);

  const cartState = useSelector((state) => state?.auth?.userCart);     //**output: undefined    figure out why
  //console.log(cartState);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);   //this last product is from the productSlice.js payload



  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + (Number(cartState[i]?.quantity) * Number(cartState[i]?.price));
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for(let i = 0; i < productState?.length; i++){
      const element = productState[i];
      data.push({id:i,productId:element?._id,name:element?.title});
    }
    setProductOptions(data);
  },[productState]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <header className="header-top-stripe pt-2">
        <div className="container-xxl">    {/*can change the screen size*/}
          <div className="row">
            <div className="col-6 mb-0">
              <p className="text-white">
                Free Shipping Over $100 & Free Return
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a href="tel:0123456789" className="text-white">
                  0123456789
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">
                  Prime.
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
              <Typeahead
                id="pagination-example"
                onPaginate={() => console.log('Results paginated')}
                onChange={(selected) => {
                  navigate(`/product/${selected[0]?.productId}`);
                  dispatch(getAProduct(selected[0]?.productId));
                }}
                options={productOptions}
                paginate={paginate}
                labelKey={"name"}
                minLength={2}   //minimum length of the input before the search is triggered
                placeholder="Search for products here..."
              />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />    {/*fs means font size */}
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items justify-content-between">
                <div>
                  <Link to="/compare-products" className="d-flex align-items-center gap-5 text-white">
                    <img src="images/compare.svg" alt="compare" />
                  </Link>
                  <p className="mb-0 text-white">Compare <br />Products</p>
                </div>

                <div>
                <Link to="/wishlist" className="d-flex align-items-center gap-5 text-white">
                    <img src="images/wishlist.svg" alt="wishlist" />
                </Link>
                <p className="mb-0 text-white">Wishlist</p>
                </div>

                <div>
                  <Link to={authState?.loggedUser ? "/my-profile" : "/signIn"} className="d-flex align-items-center gap-5 text-white">
                      {/* If the user is not logged in, then display the sign-in link, otherwise display the profile link */}
                      <img src="images/user.svg" alt="login" />
                  </Link>
                  {
                    (authState?.loggedUser || localStorage.getItem("user")) ? (    //* this change is made because here in this project react persist is not in use so when the page is refreshed the user data is lost except the token and the user which saved in the local storage in the authSlice loggedUse slice
                    <p className="mb-0 text-white">Welcome {authState.loggedUser?.firstName || JSON.parse(localStorage.getItem("user")).firstName}</p>    //"user" is the key in the local storage to store the user firstName
                    ) : (
                        <Link to="/signIn" className="mb-0 text-white">Login <br />My Account</Link>
                    )
                  }
              </div>

                <div>
                <Link to="/cart" className="d-flex align-items-center gap-5 text-white">
                    <img src="images/cart.svg" alt="cart" />
                </Link>
                <div className="d-flex flex-column">
                  <span className="badge bg-white text-dark">{cartState?.length ? cartState?.length : 0 }</span>
                  <p className="mb-0">$ {totalAmount ? totalAmount : 0}</p>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-20">
                <div>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="images/menu.svg" alt="menu" width="30" height="30" />
                    <span className="me-5 d-inline-block">Shop Categories</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="">Action</Link></li>
                    <li><Link className="dropdown-item" to="">Another action</Link></li>
                    <li><Link className="dropdown-item" to="">Something else here</Link></li>
                  </ul>
                </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button onClick={handleLogout} className="border border-0 bg-transparent text-white text-uppercase" type="button"> logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
