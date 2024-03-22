import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getAnOrder, updateAnOrder } from '../feature/auth/authSlice';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: "Products",
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,    //sorting the name took from ant design
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Date",
        dataIndex: "date",
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const ViewOrders = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[3]; //this is the id of the user  //for better understanding refer AddBrand.jsx
    //console.log(userId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAnOrder(orderId));
    },[orderId,dispatch]);

    const orderState = useSelector((state) => state?.auth?.userOrder);//*.orders check and update   //state.order is same as the order in the store.js   //the "userOrder" is same as the "userOrder" in the addCase getAOrder in the orderSlice.js
    //console.log(orderState);

    const data1 = orderState.orderItems ? orderState.orderItems.map((j, i) => ({
        key: i + 1,
        name: j.product ? j.product?.title : '', // Accessing product title
        brand: j.product ? j.product?.brand : '', // Accessing product brand
        quantity: j.quantity,
        price: j.product ? j.product?.price : '', // Accessing product amount
        color: j.color?.name,
        action: (
            <>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link>
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>

                <div>
                    <select name="" defaultValue={orderState[i]?.orderStatus} onChange={(e)=>updateOrderStatus(orderState[i]?._id,e.target.value)} className="form-control form-select" id="">   {/* defaultValue is used to set the default value of the select tag even though the page is refreshed */}
                        <option value="Ordered" disabled selected >Ordered</option>
                        <option value="Processed">Processed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            </>
        ),
    })) : [];

    const updateOrderStatus = (i,j) => {
        dispatch(updateAnOrder({id:i,orderStatus:j}));
    }

    // const data1 = [];
    // if (orderState) {
    //     for (let i = 0; i < orderState.length; i++) {
    //         data1.push({
    //             key: i + 1,
    //             name: orderState[i].product.title,
    //             brand: orderState[i].product.brand,
    //             quantity: orderState[i].quantity,
    //             amount: orderState[i].product.amount,
    //             color: orderState[i].color,
    //             date: orderState[i].product.createdAt,
    //             action: (
    //                 <>
    //                     <Link to="" className='fs-5 text-danger'><MdEditNote /></Link>
    //                     <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>
    //                     {/* ms stands for "margin start" */}
    //                 </>
    //             ),
    //         });
    //     }
    // }

    return (
        <div>
            <h3 className="mb-4 title">View Order</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default ViewOrders;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js