import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getAOrder } from '../feature/auth/authSlice';

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
        title: "Amount",
        dataIndex: "amount",
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
    const userId = location.pathname.split("/")[3]; //this is the id of the user  //for better understanding refer AddBrand.jsx
    //console.log(userId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAOrder(userId));
    },[userId,dispatch]);

    const orderState = useSelector((state) => state.auth.userOrder.products);      //state.order is same as the order in the store.js   //the "userOrder" is same as the "userOrder" in the addCase getAOrder in the orderSlice.js
    console.log(orderState);

    const data1 = orderState ? orderState.map((j, i) => ({
        key: i + 1,
        name: j.product ? j.product.title : '', // Accessing product title
        brand: j.product ? j.product.brand : '', // Accessing product brand
        quantity: j.quantity,
        amount: j.product ? j.product.amount : '', // Accessing product amount
        color: j.color,
        date: j.product ? j.product.createdAt : '', // Accessing product createdAt
        action: (
            <>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link>
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>
            </>
        ),
    })) : [];

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