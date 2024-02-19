import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getOrders } from '../feature/order/orderSlice';


const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,    //sorting the name took from ant design
    },
    {
        title: 'Product',
        dataIndex: 'product',
        //sorter: (a, b) => a.name.length - b.name.length,    //sorting the name took from ant design
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Orders = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    },[dispatch]);

    const orderState = useSelector((state) => state.order.orders);  //state.color is same as the color in the store.js   and the "colors" is same as the "colors" in the initialState name array in the colorSlice.js
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i+1,
            name: orderState[i].orderBy.firstName,
            product: orderState[i].products.map((item,j) => {
                return (
                    <ul key={j}>
                        <li>{item.product.title}</li>
                    </ul>
                );
            }),
            amount: orderState[i].paymentIntent.amount,
            date: new Date(orderState[i].createdAt).toLocaleString(),
            action:(<>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Orders</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default Orders;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js