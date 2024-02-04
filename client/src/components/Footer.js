import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin,FaGithub,FaYoutube,FaInstagram } from "react-icons/fa6";


const Footer = () => {
    return (
    <div>
        <footer className='py-4'>
            <div className='container-xxl'>
                <div className='row align-items-center'>
                    <div className='col-5'>
                        <div className='footer-to-data d-flex gap-30 align-items-center'>
                            <img src='images/newsletter.png' alt='newsletter' />
                            <h4 className='mb-0 text-white'>signUp for newsletter</h4>
                        </div>
                    </div>
                    <div className='col-7'>
                    <div className="input-group">
                        <input
                        type="text"
                        className="form-control py-1"
                        placeholder="Your Email Address"
                        aria-label="Your Email Address"
                        aria-describedby="basic-addon2"
                        />
                        <span className="input-group-text p-2" id="basic-addon2">
                        Subscribe
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </footer>

        <footer className='py-3'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-4'>
                        <h5 className='text-white mb-4'>Contact Us</h5>
                        <div>
                            <address className='text-white'>
                                colombo,<br />Srilanka
                            </address>
                            <a href='tel:0123456789' className='text-white mt-3 d-block mb-2'>tel: 0999999999</a>
                            <a href='mailto:prime@gmail.com' className='text-white mt-3 d-block mb-2'>Email: prime@gmail.com</a>

                            <div className='social-icons d-flex align-items-center gap-25 '>
                                <Link className='text-white fs-5' ><FaLinkedin /></Link>
                                <Link className='text-white fs-5' ><FaGithub /></Link>
                                <Link className='text-white fs-5' ><FaYoutube /></Link>
                                <Link className='text-white fs-5' ><FaInstagram /></Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <h5 className='text-white mb-4'>Information</h5>
                        <div className='footer-links d-flex flex-column'>
                            <Link to="/privacy-policy" className='text-white py-2 mb-1'>Privacy Policy</Link>
                            <Link to="/refund-policy" className='text-white py-2 mb-1'>Return Policy</Link>
                            <Link to="/shipping-policy" className='text-white py-2 mb-1'>Shipping Policy</Link>
                            <Link to="/terms-conditions" className='text-white py-2 mb-1'>Terms & Conditions</Link>
                            <Link to="/blogs" className='text-white py-2 mb-1'>Blogs</Link>
                        </div>
                    </div>
                    <div className='col-3'>
                        <h5 className='text-white mb-4'>Accounts</h5>
                        <div className='footer-links d-flex flex-column'>
                            <Link className='text-white py-2 mb-1'>About Us</Link>
                            <Link className='text-white py-2 mb-1'>FAQ</Link>
                            <Link className='text-white py-2 mb-1'>Contact</Link>
                        </div>
                    </div>
                    <div className='col-2'>
                        <h5 className='text-white mb-4'>Quick Links</h5>
                        <div className='footer-links d-flex flex-column'>
                            <Link className='text-white py-2 mb-1'>Laptops</Link>
                            <Link className='text-white py-2 mb-1'>Headphones</Link>
                            <Link className='text-white py-2 mb-1'>Tablets</Link>
                            <Link className='text-white py-2 mb-1'>Watches</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <footer className='py-3'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='cols-12'>
                        <p className='text-center mb-0 text-white'>
                            &copy; {new Date().getFullYear()} Prime. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
)}

export default Footer;


