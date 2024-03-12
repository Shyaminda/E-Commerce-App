import React, { useEffect } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from '../features/auth/authSlice';
import { addToWishlist } from '../features/products/productSlice.js';

const Wishlist = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserWishlist());
    },[dispatch]);

    const wishlistState = useSelector((state) => state.auth.wishlist);
    //console.log(wishlistState);   //todo: issue with wishlist not showing up in the UI, the wishlistState data is not passed from backend

    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch(getUserWishlist());
        }, 500);
    };

    return (
        <>
            <Meta title="Wishlist" />
            <BreadCrumbs title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                {
                    wishlistState.length === 0 && (
                        <h3 className='text-center'>No items in the wishlist</h3>
                    )
                }
                    {Array.isArray(wishlistState) && wishlistState?.map((item, index) => (
                        <div key={index} className="col-3">
                            <div className="wishlist-card position-relative">
                                <img src="images/cross.svg" alt="cross" onClick={()=>{removeFromWishlist(item._id)}} className='position-absolute cross img-fluid' />
                                <div className="wishlist-card-image">
                                    <img src={item.images.length > 0 && item.images[0].url } alt={item?.title} className='img-fluid w-100' />
                                </div>
                                <div className='py-3 px-2'>
                                    <h5 className='title'>{item?.title}</h5>
                                    <h6 className='price'>$ {item?.price}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default Wishlist;