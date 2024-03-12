import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as yup from "yup";

const shippingSchema = yup.object({
    firstName: yup.string().required("first Name is required"),
    lastName: yup.string().required("last Name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    zipCode: yup.number().required("Zip Code is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
});

const CheckOut = () => {
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);

    const dispatch = useDispatch();
    const userCartState = useSelector(state => state.auth.userCart);
    //console.log(userCartState);    //** figure out why this is undefined

    useEffect(() => {
        let sum = 0;
        for(let i=0; i<userCartState?.length; i++){
            sum = sum + (Number(userCartState[i]?.quantity) * userCartState[i]?.price);
            setTotalAmount(sum);
        }
    },[userCartState]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            zipCode: "",
            state: "",
            country: "",
            other: "",
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            setShippingInfo(values);
        },
    });
    

    return (
    <>
        <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        <h4 className="website-name">PRIME.com</h4>
                        <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/cart" className='text-dark'>Cart</Link></li>&nbsp; /
                                <li className="breadcrumb-item active" aria-current="page">Information</li>&nbsp; /

                                <li className="breadcrumb-item active">Shipping</li>&nbsp; /
                                <li className="breadcrumb-item active" aria-current="page">Payment</li>
                            </ol>
                        </nav>
                        <h5 className="title total fw-semibold">Contact Information</h5>
                        <p className="user-details">Chamika (chamika@gmail.com)</p>
                        <h5 className="mb-3 fw-semibold">Shipping Address</h5>

                        <form className='d-flex gap-15 flex-wrap justify-content-between total' onSubmit={formik.handleSubmit}>
                            <div className='w-100'>
                                <select name='country' 
                                    value={formik.values.country} 
                                    onChange={formik.handleChange("country")} 
                                    onBlur={formik.handleBlur("country")} 
                                    className='form-control form-select total' 
                                    id=''
                                >
                                    <option value="" selected disabled>Select Country</option>
                                    <option value="USA">United States Of America</option>
                                </select>
                                <div className='error ms-2 my-1'>
                                    {formik.touched.country && formik.errors.country}
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <input 
                                    type="text"
                                    name='firstName' 
                                    placeholder='First Name' 
                                    className="form-control total" 
                                    value={formik.values.firstName} 
                                    onChange={formik.handleChange("firstName")} 
                                    onBlur={formik.handleBlur("firstName")} 
                                />
                                <div className='error ms-2 my-1'>
                                        {formik.touched.firstName && formik.errors.firstName}
                                </div>
                            </div>
                            
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='Last Name' 
                                    className="form-control total" 
                                    name='lastName'
                                    value={formik.values.lastName} 
                                    onChange={formik.handleChange("lastName")} 
                                    onBlur={formik.handleBlur("lastName")} 
                                />
                                <div className='error ms-2 my-1'>
                                        {formik.touched.lastName && formik.errors.lastName}
                                </div>
                            </div>
                            
                            <div className='w-100'>
                                <input 
                                    type="text" 
                                    placeholder='Address' 
                                    className="form-control total" 
                                    name='address'
                                    value={formik.values.address} 
                                    onChange={formik.handleChange("address")} 
                                    onBlur={formik.handleBlur("address")}              
                                />
                                <div className='error ms-2 my-1'>
                                    {formik.touched.address && formik.errors.address}
                                </div>
                            </div>
                            

                            <div className='w-100'>
                                <input 
                                    type="text" 
                                    placeholder='Apartment,Suite,etc' 
                                    className="form-control total" 
                                    name='other'
                                    value={formik.values.other} 
                                    onChange={formik.handleChange("other")} 
                                    onBlur={formik.handleBlur("other")}
                                />
                                <div className='error ms-2 my-1'>
                                    {formik.touched.other && formik.errors.other}
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='City' 
                                    className="form-control total" 
                                    name='city'
                                    value={formik.values.city} 
                                    onChange={formik.handleChange("city")} 
                                    onBlur={formik.handleBlur("city")}
                                />
                                <div className='error ms-2 my-1'>
                                    {formik.touched.city && formik.errors.city}
                                </div>
                            </div>
                            
                            <div className='flex-grow-1'>
                                <div className='w-100'>
                                    <select 
                                        name='state' 
                                        className='form-control form-select total' 
                                        id=''
                                        value={formik.values.state} 
                                        onChange={formik.handleChange("state")} 
                                        onBlur={formik.handleBlur("state")}
                                    >
                                        <option value="" selected disabled>Select State</option>
                                        <option value="brooklyn">Brooklyn</option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='Zip Code' 
                                    className="form-control total" 
                                    name='zipCode'
                                    value={formik.values.zipCode} 
                                    onChange={formik.handleChange("zipCode")} 
                                    onBlur={formik.handleBlur("zipCode")}
                                />
                                <div className='error ms-2 my-1'>
                                        {formik.touched.zipCode && formik.errors.zipCode}
                                </div>
                            </div>

                            <div className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Link to="/cart" className="text-dark fw-semibold"><IoIosArrowBack className='me-2' />Return to cart</Link>
                                    <Link to="/cart" className="button">continue to shipping</Link>
                                    <button className='button' type='submit'>Place Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-5">
                    <div className='border-bottom py-4'>
                    {
                        userCartState && userCartState.map((item, index) => {
                            return(
                                <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                    <div className='d-flex gap-10'>
                                        <div className='w-25 position-relative'>
                                            <span style={{top:"-10px",right:"-5px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                            <img 
                                                src={item?.productId?.images[0]?.url}   //{/* here productId is from cartModel */}  {/* here images is from productModel */}
                                                alt='product' 
                                                //className='img-fluid' 
                                                width={100}
                                                height={100}
                                            />   
                                        </div>

                                        <div>
                                            <h6 className='total-price'>{item?.productId?.title}</h6>   {/* here productId is from cartModel */}
                                            <p>{item?.color?.name}</p>      {/* here color is from cartModel */}
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <h6 className='total'>$ {item?.price * item?.quantity}</h6>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>

                    <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total'>Sub-Total</p>
                            <p className='total-price'>$ {totalAmount ? totalAmount : 0}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>$ 30</p>
                        </div>
                    </div>
                    
                    <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                        <h5 className='total'>Total</h5>
                        <h6 className='total-price'>$ {totalAmount ? totalAmount + 30 : 0}</h6>
                    </div>
                </div>
            </div> 
        </Container>
    </>
    )
}

export default CheckOut;