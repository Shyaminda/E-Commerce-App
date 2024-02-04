import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";


const CheckOut = () => {
    return (
    <>
        <div className="checkout-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h4 className="website-name">PRIME.com</h4>
                            <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/cart" className='text-dark'>Cart</Link></li>&nbsp; /
                                    <li className="breadcrumb-item active" aria-current="page">Information</li>&nbsp; /

                                    <li className="breadcrumb-item active">Shipping</li>&nbsp; /
                                    <li className="breadcrumb-item active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h5 className="title total fw-semibold">Contact Information</h5>
                            <p className="user-details">Chamika (chamika@gmail.com)</p>
                            <h5 className="mb-3 fw-semibold">Shipping Address</h5>

                            <form className='d-flex gap-15 flex-wrap justify-content-between total' action="">
                                <div className='w-100'>
                                    <select name='' className='form-control form-select total' id=''>
                                        <option value="" selected disabled>Select Country</option>
                                    </select>
                                </div>
                                <div className='flex-grow-1'>
                                    <input type="text" placeholder='First Name' className="form-control total" />
                                </div>
                                <div className='flex-grow-1'>
                                    <input type="text" placeholder='Last Name' className="form-control total" />
                                </div>
                                <div className='w-100'>
                                    <input type="text" placeholder='Address' className="form-control total" />
                                </div>
                                <div className='w-100'>
                                    <input type="text" placeholder='Apartment,Suite,etc' className="form-control total" />
                                </div>
                                <div className='flex-grow-1'>
                                    <input type="text" placeholder='City' className="form-control total" />
                                </div>
                                <div className='flex-grow-1'>
                                    <div className='w-100'>
                                        <select name='' className='form-control form-select total' id=''>
                                            <option value="" selected disabled>Select State</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input type="text" placeholder='Zip Code' className="form-control total" />
                                </div>

                                <div className='w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link to="/cart" className="text-dark fw-semibold"><IoIosArrowBack className='me-2' />Return to cart</Link>
                                        <Link to="/cart" className="button">continue to shipping</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-5">
                        <div className='border-bottom py-4'>
                            <div className="d-flex gap-10 mb-2 align-items-center">
                                <div className='d-flex gap-10'>
                                    <div className='w-25 position-relative'>
                                        <span style={{top:"-10px",right:"-5px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>1</span>
                                        <img src='images/watch.jpg' alt='watch' className='img-fluid' />
                                    </div>
                                    <div>
                                        <h6 className='total-price'>Smart Watch,Battery life 24h with noise cancelation</h6>
                                        <p>#1265484ui9</p>
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <h6 className='total'>$100</h6>
                                </div>
                            </div>
                        </div>

                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total'>Sub-Total</p>
                                <p className='total-price'>$210</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total'>Shipping</p>
                                <p className='mb-0 total-price'>$210</p>
                            </div>
                        </div>
                        
                        <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                            <h5 className='total'>Total</h5>
                            <h6 className='total-price'>$ 210</h6>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </>
    )
}

export default CheckOut;