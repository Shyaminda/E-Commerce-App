import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import { MdDeleteSweep } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getCart } from '../features/auth/authSlice';


const Cart = () => {
    const [cartProductUpdateDetail, setCartProductUpdateDetail] = useState(null);

    const dispatch = useDispatch();
    const userCartState = useSelector((state) => state.auth.userCart);
    //console.log(userCartState);    //**output: undefined    figure out why

    useEffect(() => {
        dispatch(getCart());
    },[dispatch]);

    useEffect(() => {
        if(cartProductUpdateDetail !== null){    //if the cartProductUpdateDetail is not null then only dispatch the updateACartProduct
            dispatch(updateACartProduct({cartItemId:cartProductUpdateDetail?.cartItemId,quantity:cartProductUpdateDetail?.quantity}));
            setTimeout(() => {
                dispatch(getCart());
            }, 500);
        }
    },[cartProductUpdateDetail,dispatch]);

    const deleteACartProduct = (id) =>{
        dispatch(deleteCartProduct(id));   //here the id is passed 
        setTimeout(() => {
            dispatch(getCart());
        }, 500);
    }

    const updateACartProduct = (id,quantity) =>{
        
    }
    

    return (
    <>
        <Meta title="Cart" />
        <BreadCrumbs title="Cart" />
        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="cart-header py-3 mb-2 d-flex justify-content-between align-items-center">
                        <h4 className='cart-col-1'>Product</h4>
                        <h4 className='cart-col-2'>Price</h4>
                        <h4 className='cart-col-3'>Quantity</h4>
                        <h4 className='cart-col-4'>Total</h4>
                    </div>

                    {
                        userCartState && userCartState?.map((item, index)=>{
                            return(
                                <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
                                    <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                        <div className='w-25'>
                                            <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                                        </div>
                                        <div className='w-75'>
                                            <p>{item?.productId?.title}</p>
                                            <p>Colour: 
                                                <ul className='colors ps-0'>
                                                    <li style={{backgroundColor: item?.name}}></li>
                                                </ul>
                                            </p>
                                            {/* <p>Size: L</p> */}
                                        </div>  
                                    </div>
                                    <div className='cart-col-2'>
                                        <h6 className="price">$ {item?.price}</h6>
                                    </div>
                                    <div className='cart-col-3 d-flex align-items-center gap-15'>
                                        <div>
                                            <input 
                                                type="number" 
                                                name="" 
                                                min={1} 
                                                id="" 
                                                value={cartProductUpdateDetail?.quantity ? cartProductUpdateDetail?.quantity : item?.quantity} 
                                                onChange={(e)=>{setCartProductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})}} 
                                                className='form-control' 
                                            />
                                        </div>
                                        <div>
                                        <MdDeleteSweep onClick={()=>{deleteACartProduct(item?._id)}} size={25} />
                                        </div>
                                    </div>
                                    <div className='cart-col-4'>
                                        <h6 className="price">$ {item?.price * item?.quantity}</h6>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='col-12 py-2 mt-4'>
                        <div className="d-flex justify-content-between align-items-baseline">
                        <Link to="/product" className="button">continue to shopping</Link>
                            <div className='d-flex flex-column align-items-end'>
                                <h4 className='fs-6'>Sub-Total: $1000</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">proceed to checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Cart