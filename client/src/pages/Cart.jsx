import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import { MdDeleteSweep } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../components/Container';


const Cart = () => {
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

                    <div className="cart-data py-3 d-flex justify-content-between align-items-center">
                        <div className='cart-col-1 gap-15 d-flex align-items-center'>
                            <div className='w-25'>
                                <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                            </div>
                            <div className='w-75'>
                                <p>Watch</p>
                                <p>Colour: black</p>
                                <p>Size: L</p>
                            </div>
                        </div>
                        <div className='cart-col-2'>
                            <h6 className="price">$ 100</h6>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                                <input type="number" name="" min={1} id="" className='form-control' />
                            </div>
                            <div>
                            <MdDeleteSweep size={25} />
                            </div>
                        </div>
                        <div className='cart-col-4'>
                            <h6 className="price">$ 100</h6>
                        </div>
                    </div>

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