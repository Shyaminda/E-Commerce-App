import React, { useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import services from '../utils/Data';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from '../features/blog/blogSlice';
import moment from 'moment';
import { getProducts } from '../features/products/productSlice';
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from '../features/products/productSlice';

function Home() {
    const blogState = useSelector((state) => state.blog.blog);
    //console.log(blogState);
    const productState = useSelector((state) => state.product.product);
    console.log(productState);

    const dispatch = useDispatch();

    useEffect(() => {
        getAllBlogs();
        getAllProducts();
    },[]);

    const getAllBlogs = () => {
        dispatch(getBlogs());
    };

    const getAllProducts = () => {
        dispatch(getProducts());
    };

    const addToWish = (productId) => {
        dispatch(addToWishlist(productId));
    };

    return (
        <>
            <Container class1="home-wrapper-1 py-5">
                <div className='row'>
                    <div className='col-6'>
                        <div className='main-banner position-relative p-1'>
                            <img src='images/main-banner-1.jpg' alt='main banner' className='img-fluid rounded-3' />
                            <div className='main-banner-content position-absolute'>
                                <h5>SUPERCHARGED FOR PROS</h5>
                                <h6>IPHONE 15 PRO MAX</h6>
                                <p>From $999 or $41.12/mo</p>
                                <Link className='button '>BUY NOW</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                            <div className='other-banner position-relative p-1'>
                                <img src='images/catbanner-01.jpg' alt='other banner' className='img-fluid rounded-3' />
                                <div className='other-banner-content position-absolute'>
                                    <h5>BEST SALE</h5>
                                    <h6>MACBOOK PRO</h6>
                                    <p>From $1699 or <br /> $64.12/mo</p>
                                </div>
                            </div>
                            <div className='other-banner position-relative p-1'>
                                <img src='images/catbanner-02.jpg' alt='other banner' className='img-fluid rounded-3' />
                                <div className='other-banner-content position-absolute'>
                                    <h5>15% OFF</h5>
                                    <h6>APPLE WATCH</h6>
                                    <p>Shop for the latest <br /> band</p>
                                </div>
                            </div>
                            <div className='other-banner position-relative p-1'>
                                <img src='images/catbanner-03.jpg' alt='other banner' className='img-fluid rounded-3' />
                                <div className='other-banner-content position-absolute'>
                                    <h5>NEW ARRIVAL</h5>
                                    <h6>BUY AIR PAD</h6>
                                    <p>From $699 or <br /> $54.12/mo</p>
                                </div>
                            </div>
                            <div className='other-banner position-relative p-1'>
                                <img src='images/catbanner-04.jpg' alt='other banner' className='img-fluid rounded-3' />
                                <div className='other-banner-content position-absolute'>
                                    <h5>FREE ENGRAVING</h5>
                                    <h6>AIRPODS MAX</h6>
                                    <p>ultra low latency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="home-wrapper-2 py-5">
                <div className='row'>
                    <div className='col-12'>
                        <div className='services d-flex align-items-center justify-content-between'>
                            {
                                services?.map((i,j)=>{
                                    return(
                                        <div className="d-flex align-items-center gap-10" key={j}>
                                            <img src={i.image} alt='services' />
                                            <div>
                                                <h6>{i.title}</h6>
                                                <p className="mb-0">{i.tagline}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="home-wrapper-2 py-5">
                <div className='row'>
                    <div className="col-12">
                        <div className="categories d-flex justify-content align-items-center flex-wrap">
                            <div className='d-flex gap-20 align-items-center'>
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/camera.jpg' alt='camera' />
                            </div>
                            <div className='d-flex gap-20 align-items-center'>
                                <div>
                                    <h6>Smart TV</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/tv.jpg' alt='tv' />
                            </div>
                            <div className='d-flex gap-10 align-items-center'>
                                <div>
                                    <h6>Headphones</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/headphone.jpg' alt='headphone' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Tablets</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/tab.jpg' alt='tab' height="auto%" width="60%" />
                            </div>
                            <div className='d-flex gap-20 align-items-center'>
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/camera.jpg' alt='camera' />
                            </div>
                            <div className='d-flex gap-20 align-items-center'>
                                <div>
                                    <h6>Smart TV</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/tv.jpg' alt='tv' />
                            </div>
                            <div className='d-flex gap-10 align-items-center'>
                                <div>
                                    <h6>Headphones</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/headphone.jpg' alt='headphone' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <h6>Tablets</h6>
                                    <p>10 items</p>
                                </div>
                                <img src='images/tab.jpg' alt='tab' height="auto%" width="60%" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="featured-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Feature Collections</h3>
                    </div>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </Container>

            <Container class1="special-wrapper py-5 home-wrapper-2">
                <div className='row'>
                    <div className="col-12">
                        <h4 className="section-heading">Special Products</h4>
                    </div>
                </div>
                <div className='row'>
                {
                    productState && productState?.map((item,index) => {
                        if(item.tags === "special"){
                            return(
                                <SpecialProduct 
                                    key={index}
                                    id={item?._id}
                                    title={item?.title}
                                    price={item?.price}
                                    brand={item?.brand}
                                    totalRatings={item?.totalRatings.toString()}
                                    images={item?.images[0].url}
                                    sold={item?.sold}
                                    quantity={item?.quantity}
                                />
                            )
                        }
                        return null;
                    })
                }
                </div> 
            </Container>

            <Container class1='famous-wrapper py-5 home-wrapper-2'>
                <div className="row">
                    <div className="col-3">
                        <div className="famous-card position-relative" >
                            <img src='images/famous-1.jpeg' alt='famous' className='img-fluid' />
                            <div className="famous-content position-absolute">
                                <h5>Big Screen</h5>
                                <h6>Smart Watch Series 8</h6>
                                <p>From $399 or $16/mo</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative" >
                            <img src='images/famous-2.webp' alt='famous' className='img-fluid align-items-end position-absolute' />
                            <div className="famous-content position-absolute">
                                <h5 className='text-dark'>Studio Display</h5>
                                <h6 className='text-dark'>600 Nits of Brightness</h6>
                                <p className='text-dark'>27inch 5K Retina</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative" >
                            <img src='images/famous-3.jpeg' alt='famous' className='img-fluid align-items-end position-absolute' />
                            <div className="famous-content position-absolute">
                                <h5 className='text-dark'>smartphones</h5>
                                <h6 className='text-dark'>Iphone 15 pro max</h6>
                                <p className='text-dark'>With OLED Display</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative" >
                            <img src='images/famous-4.jpeg' alt='famous' className='img-fluid align-items-end position-absolute' />
                            <div className="famous-content position-absolute">
                                <h5 className='text-dark'>home speakers</h5>
                                <h6 className='text-dark'>Room Filling Sound</h6>
                                <p className='text-dark'>From $399 or $16/mo</p>
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

                    {
                        productState && productState?.map((item,index) => {
                            if(item.tags === "popular"){
                                return(
                                    <div key={index} className={"col-3"}>
                                    <Link className="product-card position-relative">   {/* to="product/:id" */}
                                        <div className="wishlist-icon position-absolute">
                                            <button className='border-0 bg-transparent' onClick={(e)=>{addToWish(item?._id)}}>
                                                <img src="images/wish.svg" alt="wishlist" />
                                            </button>
                                        </div>

                                        <div className="product-image">
                                            <img src={item.images.length > 0 && item.images[0].url} alt="product" className='img-fluid' />
                                            <img src="images/watch-1.webp" alt="product" className='img-fluid' />
                                        </div>

                                        <div className="product-details">
                                            <h6 className="brand">{item?.brand}</h6>
                                            <h5 className="product-title">{item?.title}</h5>
                                            <ReactStars
                                                count={5}
                                                size={10}
                                                value={item?.totalRatings.toString()}
                                                edit={false}
                                                activeColor="#ffd700" 
                                            />
                                            <p className='price'>$ {item?.price}</p>
                                        </div>
                                        
                                        <div className="action-bar position-absolute">
                                            <div className="d-flex flex-column gap-10">
                                                <button className='border-0 bg-transparent'>
                                                    <img src="images/add-cart.svg" alt="add-cart" />
                                                </button>
                                                <button className='border-0 bg-transparent'>
                                                    <img src="images/prodcompare.svg" alt="prodcompare" />
                                                </button>
                                                <button className='border-0 bg-transparent'>
                                                    <img src="images/view.svg" alt="view" />
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                )
                            }
                            return null;
                        })
                    }

                    </div>
            </Container>

            <Container class1="marquee-wrapper py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="marquee-inner-wrapper card-wrapper">
                            <Marquee className='d-flex'>
                                <div className='mx-4'>
                                    <img src='images/brand-01.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-02.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-03.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-04.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-05.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-06.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-07.png' alt='brand' width="65%" />
                                </div>
                                <div className='mx-4'>
                                    <img src='images/brand-08.png' alt='brand' width="65%" />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="blog-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our latest blogs
                        </h3>
                    </div>
                </div>
                <div className="row">
                {
                    blogState && blogState?.map((item,index) => {
                        if(index < 4){
                            return(
                                <div className="col-3" key={index}>
                                    <BlogCard 
                                        id={item?._id}
                                        title={item?.title}
                                        description={item?.description}
                                        images={item?.images[0].url}
                                        date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    />
                                </div>
                            )
                        }
                        return null;
                    })
                }
                </div>
            </Container>
        </>
    );
}

export default Home;


