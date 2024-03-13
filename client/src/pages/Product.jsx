import React, { useEffect } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addToCart, getCart } from '../features/auth/authSlice';

const Product = () => {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [popularProducts, setPopularProducts] = useState([]);

    //console.log(quantity);
    //console.log(color);

    const location = useLocation();
    const getProductId = location.pathname.split('/')[2];    //splitting the url to get the product id
    const navigate = useNavigate();

    const productState = useSelector((state) => state?.product?.singleProduct);
    //console.log(productState);
    const productsState = useSelector((state) => state.product.product);
    //console.log(productsState);
    const cartState = useSelector((state) => state?.auth?.userCart);
    //console.log(cartState);     //**output: undefined    figure out why

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getCart())
    },[dispatch, getProductId]);

    useEffect(() => {
        for(let i=0; i<cartState?.length; i++){
            if(getProductId[i] === cartState[i]?.productId?._id){    //checking if the product is already in the cart
                setAlreadyAdded(true);
            }
        }
    },[cartState, getProductId]);

    const uploadCart = () => {
        if(color === null){
            toast.error('Please select a color');
            return false;
        } else {
            dispatch(addToCart({productId: productState?._id, color , quantity, price: productState?.price}));     //here the quantity and color are are taken from the state to send
            //console.log({productId: productState?._id, color , quantity, price: productState?.price});
            navigate('/cart')   //redirecting to the cart page
        }
    };

    // const newCart = useSelector((state) => state.auth);    //getting the state from the authSlice.js
    // const { isSuccess, isError, cart } = newCart;    //getting the success and error from the authSlice.js

    // useEffect(() => {
    //     if (isSuccess && cart) {
    //         toast.success("Product added to cart successfully!");
    //     }
    //     if (isError) {
    //         toast.error("Something Went Wrong!");
    //     }
    // }, [isSuccess, isError, dispatch, cart]);


    const props = {width: 400, height: 500, zoomWidth: 450, img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"  };

    const [orderedProduct] = useState(true);     //, setOrderedProduct
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    useEffect(() => {
        let data = [];
        for (let i = 0; i < productsState.length; i++) {
            const element = productsState[i];
            if(element.tags === "popular"){
                data.push(element);
            }
            setPopularProducts(data);
        }
    },[productsState]);
    //console.log(popularProducts);

    return (
    <>
        <Meta title="Product Name" />
        <BreadCrumbs title="Product Name" />
        <Container class1="main-product-wrapper py-2 home-wrapper-2">
            <div className="row">
                <div className="col-6">
                    <div className="main-product-image">
                        <div><ReactImageZoom {...props} /></div>
                    </div>
                    <div className="other-product-images d-flex flex-wrap gap-10">
                        {productState?.images?.map((img, index) => {
                            return(
                                <div key={index}>
                                    <img src={img?.url} alt='watch' className='img-fluid' />
                                </div>
                            )
                        })}
                        {/* <div><img src='https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D' alt='watch' className='img-fluid' /></div>
                        <div><img src='https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D' alt='watch' className='img-fluid' /></div>
                        <div><img src='https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D' alt='watch' className='img-fluid' /></div>
                        <div><img src='https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D' alt='watch' className='img-fluid' /></div> */}
                    </div>
                </div>
                
                <div className="col-6">
                    <div className="main-product-details">
                        <div className='border-bottom'>
                            <h5 className='title'>{productState?.title}</h5>
                        </div>
                        <div className="border-bottom py-3">
                            <p className="price">$ {productState?.price}</p>
                            <div className="d-flex align-items-center gap-10">
                                <ReactStars
                                    count={5}
                                    size={15}
                                    value={4}
                                    edit={false}
                                    activeColor="#ffd700" 
                                />
                                <p className='mb-0 t-review'>(3 reviews)</p>
                            </div>
                            <a href='#review' className='review-btn text-decoration-underline'>Write a review</a>
                        </div>
                        <div className="py-3">
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h4 className='product-heading'>Type:</h4>
                                <p className='product-data'>Watch</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h4 className='product-heading'>Brand:</h4>
                                <p className='product-data'>{productState?.brand}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h4 className='product-heading'>Category:</h4>
                                <p className='product-data'>{productState?.category}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h4 className='product-heading'>Tags:</h4>
                                <p className='product-data'>{productState?.tags}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h4 className='product-heading'>Availability:</h4>
                                <p className='product-data'>In Stock</p>
                            </div>
                            <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                <h4 className='product-heading'>Size:</h4>
                                <div className="d-flex gap-10 flex-wrap">
                                    <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                </div>
                            </div>

                            {
                                alreadyAdded === false &&
                                <>
                                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                        <h4 className='product-heading'>Colour:</h4>
                                        <Color setColor={setColor} colorData={productState?.color} />
                                    </div>
                                </>
                            }
                            
                            <div className='d-flex gap-10 align-items-center flex-row mt-2 mb-3'>
                                {
                                    alreadyAdded === false && 
                                    <>
                                        <h4 className='product-heading'>Quantity:</h4>
                                        <div className=''>
                                            <input 
                                                type="number" 
                                                name="" 
                                                min={1} 
                                                style={{width:"60px"}} 
                                                id='' 
                                                className='form-control' 
                                                onChange={(e) => setQuantity(e.target.value)}
                                                value={quantity}
                                            />
                                        </div>
                                    </>
                                }

                                <div className='d-flex align-items-center gap-15 ms-5'>   {/* className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-15 ms-5'} */}
                                    <button 
                                        type='submit'
                                        className='button signIn'
                                        onClick={() => {alreadyAdded? navigate('/cart') : uploadCart()}}
                                    >
                                        {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                                    </button>
                                    <button to="/sign-up" className='button signup'>Buy Now</button>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-15">
                                <div>
                                    <a href='/'><IoGitCompare  size={17} className='me-2' />Compare</a>
                                </div>
                                <div>
                                    <a href='/'><FaRegHeart size={16} className='me-2' />Add to Wishlist</a>
                                </div>
                            </div>

                            <div className='d-flex gap-10 flex-column my-3'>
                                <h4 className='product-heading'>Shippings & Returns:</h4>
                                <p className='product-data'>Free shipping and returns available an all orders!
                                    we ship all the domestic orders within 2-3 days and international orders within 7-10 days.
                                </p>
                            </div>

                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h4 className='product-heading'>Product Link:</h4>
                                    <a href="javascript:void(0);" onClick={() => {copyToClipboard(window.location.href)}} className='product-data'>Copy Product Link</a>     {/* copying the link to clipboard */}
                            </div>  {/* inside href="javascript:void(0);" */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </Container>

        <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <h4>Description</h4>
                    <div className="bg-white p-3">
                        <p dangerouslySetInnerHTML={{__html: productState?.description}}></p>
                    </div>
                </div>
            </div>
        </Container>

        <Container class1='review-wrapper home-wrapper-2'>
            <div className="row">
                <div className="col-12">
                    <h4 id='review' >Reviews</h4>
                    <div className="review-inner-wrapper">
                        <div className="review-head d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className='mb-2'>Customer Reviews</h4>
                                <div className='d-flex align-items-center gap-10'>
                                    <ReactStars
                                        count={5}
                                        size={15}
                                        value={productState?.totalRatings.toString()}
                                        edit={false}
                                        activeColor="#ffd700" 
                                    />
                                    <p className='mb-0'>Based on 3 reviews</p>
                                </div>
                            </div>
                            {orderedProduct && (
                                <div>
                                    <Link className='text-dark text-decoration-underline' to="">
                                        Write a review
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="review-form py-4">
                        <h4 className='mb-2'>Write a Review</h4>
                        <form className='d-flex flex-column gap-10'>
                                <div>
                                <ReactStars
                                        count={5}
                                        size={15}
                                        value={4}
                                        edit={true}
                                        activeColor="#ffd700" 
                                    />
                                </div>
                                <div>
                                    <textarea name='' id='' cols={30} rows={5} placeholder="Comments" className='form-control mb-3 w-100' />
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button className='button'>Submit Review</button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="reviews mt-3">
                            <div className="review">
                                <div className="d-flex gap-10 align-items-center">
                                    <h6 className='mb-0'>John Doe</h6>
                                    <ReactStars
                                        count={5}
                                        size={15}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700" 
                                    />
                                </div>
                                <p className='mt-3'>
                                    Eum dicta nulla praesentium voluptatem ut at facilis cumque. Et et et amet ipsam enim aliquid est sapiente. Dolorem ut vitae dolores adipisci nostrum et est. Officia eos dolor adipisci est.
                                    Nesciunt esse iste
                                </p>
                            </div>
                            <div className="review">
                                <div className="d-flex gap-10 align-items-center">
                                    <h6 className='mb-0'>John Doe</h6>
                                    <ReactStars
                                        count={5}
                                        size={15}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700" 
                                    />
                                </div>
                                <p className='mt-3'>
                                    Eum dicta nulla praesentium voluptatem ut at facilis cumque. Et et et amet ipsam enim aliquid est sapiente. Dolorem ut vitae dolores adipisci nostrum et est. Officia eos dolor adipisci est.
                                    Nesciunt esse iste
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
            
        <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">Our Popular Products</h3>
                </div>
            </div>
            <div className="row">
                <ProductCard data={popularProducts} />
                
            </div>
        </Container>
    </>
    )
}

export default Product;