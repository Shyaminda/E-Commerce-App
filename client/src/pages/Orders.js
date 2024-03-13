import React, { useEffect } from 'react';
import Container from '../components/Container';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';

const Orders = () => {
    const dispatch = useDispatch();

    const orderState = useSelector(state => state.auth.userOrders);    //.orders
    //console.log(orderState);     //* figure out why orderState is undefined

    useEffect(() => {
        dispatch(getOrders());
    },[dispatch]);

    return (
        <>
            <Meta title="Orders" />
            <BreadCrumbs title="Orders" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3">
                                <h6>Order Id</h6>
                            </div>
                            <div className="col-3">
                                <h6>Total Amount</h6>
                            </div>
                            <div className="col-3">
                                <h6>Total Amount after discount</h6>
                            </div>
                            <div className="col-3">
                                <h6>Status</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        {
                            orderState && orderState.map((item,index)=>{
                                return(
                                    <div style={{backgroundColor:"#febd69"}} className="row my-3 pt-3" key={index}>
                                        <div className="col-3">
                                            <p>{item?._id}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.totalPrice}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.totalPriceAfterDiscount}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.orderStatus}</p>
                                        </div>

                                        <div className="col-12">
                                            <div style={{backgroundColor:"#232f3e"}} className="row py-2">
                                                <div className="col-3">
                                                    <h7 className="text-white">Product Name</h7>
                                                </div>
                                                <div className="col-3">
                                                    <h7 className="text-white">Quantity</h7>
                                                </div>
                                                <div className="col-3">
                                                    <h7 className="text-white">Price</h7>
                                                </div>
                                                <div className="col-3">
                                                    <h7 className="text-white">Color</h7>
                                                </div>
                                                {
                                                    item?.orderItems?.map((item,index)=>{
                                                        return(
                                                            <div className="col-12" key={index}>
                                                                <div className="row p-3">
                                                                    <div className="col-3">
                                                                        <p className="text-white">{item?.product?.title}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-white">{item?.quantity}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-white">{item?.price}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                    <ul className='colors ps-0'>
                                                                        <li style={{backgroundColor: item?.color}}></li>
                                                                    </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Orders