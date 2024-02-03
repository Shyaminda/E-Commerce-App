import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link,useLocation } from 'react-router-dom';

const ProductCard = (Props) => {
    const { grid } = Props;
    const location = useLocation();
    return (
    <>
        <div className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
            <Link className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link>
                        <img src="images/wish.svg" alt="wishlist" />
                    </Link>
                </div>
                <div className="product-image">
                    <img src="images/watch.jpg" alt="product" className='img-fluid' />
                    <img src="images/watch-1.webp" alt="product" className='img-fluid' />
                </div>
                <div className="product-details">
                    <h6 className="brand">Apple</h6>
                    <h5 className="product-title">Apple watch 3 with 3 colours</h5>
                    <ReactStars
                        count={5}
                        size={10}
                        value={4}
                        edit={false}
                        activeColor="#ffd700" 
                    />
                    <p className={`description ${grid===12 ? "d-block" : "d-none"}`}>Eveniet omnis optio deserunt laudantium tempora ut aut nisi expedita. Possimus nihil ipsam quam aut dolores sint consequatur. Corrupti minus ex et sapiente ipsum quaerat magni. Quasi modi ducimus nulla suscipit mollitia possimus.</p>
                    <p className='price'>$100</p>
                </div>
                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-10">
                        <Link>
                            <img src="images/add-cart.svg" alt="add-cart" />
                        </Link>
                        <Link>
                            <img src="images/prodcompare.svg" alt="prodcompare" />
                        </Link>
                        <Link>
                            <img src="images/view.svg" alt="view" />
                        </Link>
                        
                    </div>
                </div>
            </Link>
        </div>
        <div className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
        <Link className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
                <Link>
                    <img src="images/wish.svg" alt="wishlist" />
                </Link>
            </div>
            <div className="product-image">
                <img src="images/watch.jpg" alt="product" className='img-fluid' />
                <img src="images/watch-1.webp" alt="product" className='img-fluid' />
            </div>
            <div className="product-details">
                <h6 className="brand">Apple</h6>
                <h5 className="product-title">Apple watch 3 with 3 colours</h5>
                <ReactStars
                    count={5}
                    size={10}
                    value={4}
                    edit={false}
                    activeColor="#ffd700" 
                />
                <p className={`description ${grid===12 ? "d-block" : "d-none"}`}>Eveniet omnis optio deserunt laudantium tempora ut aut nisi expedita. Possimus nihil ipsam quam aut dolores sint consequatur. Corrupti minus ex et sapiente ipsum quaerat magni. Quasi modi ducimus nulla suscipit mollitia possimus.</p>
                <p className='price'>$100</p>
            </div>
            <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-10">
                    <Link>
                        <img src="images/add-cart.svg" alt="add-cart" />
                    </Link>
                    <Link>
                        <img src="images/prodcompare.svg" alt="prodcompare" />
                    </Link>
                    <Link>
                        <img src="images/view.svg" alt="view" />
                    </Link>
                    
                </div>
            </div>
        </Link>
    </div>
    </>
    )
}

export default ProductCard;