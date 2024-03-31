import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import { MdDeleteSweep } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getCart, updateCartProduct } from '../features/auth/authSlice';


const Cart = () => {
    const getTokenFromLocalStorage = localStorage.getItem("token"); // Retrieve token using the correct key
    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage}`, // Include the retrieved token in the Authorization header
            Accept: "application/json",
        },
    };

    const [cartProductUpdateDetail, setCartProductUpdateDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);

    console.log(cartProductUpdateDetail);

    const dispatch = useDispatch();
    const userCartState = useSelector((state) => state?.auth?.userCart);
    //console.log(userCartState);   //* to make the data from the redux store to an array we need to make the backend data retrieval word findOne to find then the data will be dispatched from the backend as an array const cart = await Cart.find({userId: _id}).populate("productId").populate("color");
    const cartUpdateState = useSelector((state) => state?.auth?.updatedCartProduct);
    console.log(cartUpdateState);

    useEffect(() => {    //this useEffect is used to get the cart data fetch
        dispatch(getCart(config2))
    },[dispatch]);

    useEffect(() => {    //this useEffect is used to update the cart data 
        if(cartProductUpdateDetail !== null){    //if the cartProductUpdateDetail is not null then only dispatch the updateACartProduct
            dispatch(updateCartProduct({cartItemId:cartProductUpdateDetail?.cartItemId,quantity:cartProductUpdateDetail?.quantity,config2:config2}));
            setTimeout(() => {
                dispatch(getCart(config2));
            }, 500);
        }
    },[cartProductUpdateDetail,dispatch]);

    const deleteACartProduct = (id) =>{
        dispatch(deleteCartProduct({id:id,config2:config2}));   //here the id is passed 
        setTimeout(() => {
            dispatch(getCart(config2));
        }, 500);
    }

    const updateACartProduct = (id,quantity) =>{
        console.log("Updating cart product:", id,quantity);
    }

    useEffect(() => {
        if (userCartState) {
            let sum = 0;
            userCartState.forEach((item) => {
                sum += Number(item.quantity) * item.price;
            });
            setTotalAmount(sum);
        }
    }, [userCartState]);
    
    
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
                        userCartState && userCartState.map((item, index)=>{    //here the userCartState is an object which is been transformed in an array to use with the map function
                            //console.log(item);
                            return(
                                <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
                                    <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                        <div className='w-25'>
                                            <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                                        </div>
                                        <div className='w-75'>
                                        {/* {            //here tried to get the title from the productId object but it is not working
                                            Object.values(products).map((item, index)=>{
                                                return(
                                                    <div key={index}>
                                                        <p>{item?.title}</p>
                                                    </div>
                                                )
                                            })
                                        } */}
                                            <p>{item?.productId?.title}</p> 
                                            <div>Colour: 
                                                <ul className='colors ps-0'>
                                                    <li style={{backgroundColor: item?.name}}></li>
                                                </ul>
                                            </div>
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
                                                onChange={(e)=>{setCartProductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})
                                                console.log("cartProductUpdateDetail:", cartProductUpdateDetail);
                                                }} 
                                                
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
                            {
                                (totalAmount !== null || totalAmount !== 0) &&
                                <div className='d-flex flex-column align-items-end'>
                                <h4 className='fs-6'>Sub-Total: $ {totalAmount}</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">proceed to checkout</Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Cart;




// import React, { useEffect, useState } from 'react';
// import BreadCrumbs from '../components/BreadCrumbs';
// import Meta from '../components/Meta';
// import { MdDeleteSweep } from "react-icons/md";
// import { Link } from 'react-router-dom';
// import Container from '../components/Container';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCartProduct, getCart } from '../features/auth/authSlice';


// const Cart = () => {
//     const getTokenFromLocalStorage = localStorage.getItem("token"); // Retrieve token using the correct key
//     const config2 = {
//         headers: {
//             Authorization: `Bearer ${getTokenFromLocalStorage}`, // Include the retrieved token in the Authorization header
//             Accept: "application/json",
//         },
//     };

//     // const getTokenFromLocalStorage = localStorage.getItem("token")
//     // ? JSON.parse(localStorage.getItem("token"))
//     // : null;

//     // const config2 = {
//     // headers: {
//     //     Authorization: `Bearer ${
//     //         getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//     //     }`,
//     //     Accept: "application/json",
//     // },
//     // };

//     const [cartProductUpdateDetail, setCartProductUpdateDetail] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(null);

//     const dispatch = useDispatch();
//     const userCartState = useSelector((state) => state?.auth?.userCart);
//     console.log(userCartState);

//     // useEffect(() => {
//     //     if (userCartState) {
//     //         console.log(userCartState); // Log the userCartState only if it exists
//     //     }
//     // }, [userCartState]);

//     useEffect(() => {    //this useEffect is used to get the cart data fetch
//         dispatch(getCart(config2));
//     },[dispatch]);

//     useEffect(() => {    //this useEffect is used to update the cart data 
//         if(cartProductUpdateDetail !== null){    //if the cartProductUpdateDetail is not null then only dispatch the updateACartProduct
//             dispatch(updateACartProduct({cartItemId:cartProductUpdateDetail?.cartItemId,quantity:cartProductUpdateDetail?.quantity}));
//             setTimeout(() => {
//                 dispatch(getCart());
//             }, 500);
//         }
//     },[cartProductUpdateDetail,dispatch]);

//     const deleteACartProduct = (id) =>{
//         dispatch(deleteCartProduct(id));   //here the id is passed 
//         setTimeout(() => {
//             dispatch(getCart());
//         }, 500);
//     }

//     const updateACartProduct = (id,quantity) =>{
        
//     }

//     useEffect(() => {
//         let sum = 0;
//         for(let i=0; i<userCartState?.length; i++){
//             sum = sum + (Number(userCartState[i]?.quantity) * userCartState[i]?.price);
//             setTotalAmount(sum);
//         }
//     },[userCartState]);
    
//     // const userCartArray = Object.entries(userCartState);
//     // console.log(userCartArray);

//     return (
//     <>
//         <Meta title="Cart" />
//         <BreadCrumbs title="Cart" />
//         <Container class1="cart-wrapper home-wrapper-2 py-5">
//             <div className="row">
//                 <div className="col-12">
//                     <div className="cart-header py-3 mb-2 d-flex justify-content-between align-items-center">
//                         <h4 className='cart-col-1'>Product</h4>
//                         <h4 className='cart-col-2'>Price</h4>
//                         <h4 className='cart-col-3'>Quantity</h4>
//                         <h4 className='cart-col-4'>Total</h4>
//                     </div>
                    

//                     {
//                         userCartState && userCartState?.map((item, index)=>{
//                             return(
//                                 <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
//                                     <div className='cart-col-1 gap-15 d-flex align-items-center'>
//                                         <div className='w-25'>
//                                             <img src="images/watch.jpg" alt="watch" className='img-fluid' />
//                                         </div>
//                                         <div className='w-75'>
//                                             <p>{item?.productId?.title}</p>
//                                             <p>Colour: 
//                                                 <ul className='colors ps-0'>
//                                                     <li style={{backgroundColor: item?.name}}></li>
//                                                 </ul>
//                                             </p>
//                                             {/* <p>Size: L</p> */}
//                                         </div>  
//                                     </div>
//                                     <div className='cart-col-2'>
//                                         <h6 className="price">$ {item?.price}</h6>
//                                     </div>
//                                     <div className='cart-col-3 d-flex align-items-center gap-15'>
//                                         <div>
//                                             <input 
//                                                 type="number" 
//                                                 name="" 
//                                                 min={1} 
//                                                 id="" 
//                                                 value={cartProductUpdateDetail?.quantity ? cartProductUpdateDetail?.quantity : item?.quantity} 
//                                                 onChange={(e)=>{setCartProductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})}} 
//                                                 className='form-control' 
//                                             />
//                                         </div>
//                                         <div>
//                                         <MdDeleteSweep onClick={()=>{deleteACartProduct(item?._id)}} size={25} />
//                                         </div>
//                                     </div>
//                                     <div className='cart-col-4'>
//                                         <h6 className="price">$ {item?.price * item?.quantity}</h6>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }

//                     <div className='col-12 py-2 mt-4'>
//                         <div className="d-flex justify-content-between align-items-baseline">
//                         <Link to="/product" className="button">continue to shopping</Link>
//                             {
//                                 (totalAmount !== null || totalAmount !== 0) &&
//                                 <div className='d-flex flex-column align-items-end'>
//                                 <h4 className='fs-6'>Sub-Total: $ {totalAmount}</h4>
//                                 <p>Taxes and shipping calculated at checkout</p>
//                                 <Link to="/checkout" className="button">proceed to checkout</Link>
//                             </div>
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     </>
//     )
// }

// export default Cart