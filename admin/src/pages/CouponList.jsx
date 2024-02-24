import React, { useEffect} from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getCoupons } from '../feature/coupon/couponSlice';

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
        title: 'Expire Date',
        dataIndex: 'expiryDate',
        sorter: (a, b) => a.expiryDate - b.expiryDate,    //sorting the name took from ant design
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,    //sorting the name took from ant design
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const CouponList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoupons());
    },[dispatch]);

    const couponState = useSelector((state) => state.coupon.coupons);    //state.coupon is same as the brand in the store.js   and the "coupons" is same as the "coupons" in the couponSlice.js "state.coupons = action.payload;"
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i+1,
            name: couponState[i].name,
            expiryDate: new Date(couponState[i].expiryDate).toLocaleString(),   //converting the date to the local date format
            discount: couponState[i].discount,
            action:(<>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Coupons</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default CouponList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js