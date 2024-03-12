import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  
  const [totalAmount, setTotalAmount] = useState(null);    

  const cartState = useSelector((state) => state?.auth?.userCart);     //**output: undefined    figure out why
  //console.log(cartState);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + (Number(cartState[i]?.quantity) * Number(cartState[i]?.price));
      setTotalAmount(sum);
    }
  }, [cartState]);

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
                Hotline:{" "}
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
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search products"
                  aria-label="Search products"
                  aria-describedby="basic-addon2"
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
                <Link to="/signIn" className="d-flex align-items-center gap-5 text-white">
                    <img src="images/user.svg" alt="login" />
                </Link>
                <p className="mb-0 text-white">Login <br />My Account</p>
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
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
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
