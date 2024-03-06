import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link,useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToWishlist } from '../features/products/productSlice';

const ProductCard = (Props) => {
    const { grid, data } = Props;
    const location = useLocation();
    //console.log(data);
    const dispatch = useDispatch();

    const addToWish = (productId) => {
        dispatch(addToWishlist(productId));
    };

    return (
    <>
        {
            Array.isArray(data) && data?.map((item, index) => {     //Array.isArray() is used to determine whether the passed value is an array. If it is, the method returns true, otherwise it returns false.
                return (
                    <div key={index} className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
                        <div className="product-card position-relative">   {/* to="product/:id" */}
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
                                <p className={`description ${grid===12 ? "d-block" : "d-none"}`}  dangerouslySetInnerHTML={{__html: item?.description}}></p>
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
                                    <Link to={`/product/${item._id}`} className='border-0 bg-transparent'>
                                        <img src="images/view.svg" alt="view" />
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </>
    )
}

export default ProductCard;