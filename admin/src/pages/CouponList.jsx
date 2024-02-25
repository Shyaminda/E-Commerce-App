import React, { useEffect, useState} from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteACoupon, getCoupons } from '../feature/coupon/couponSlice';
import { resetState } from '../feature/product/productSlice';
import CustomModal from '../components/CustomModal';

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
    const [open, setOpen] = useState(false);
    const [couponId, setCouponId] = useState("");   //this is done to get the id of the brand to be deleted
    const showModal = (e) => {
        setOpen(true);
        setCouponId(e)
    };
    //console.log(brandId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState()); //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
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
                <Link to={`/admin/coupon/${couponState[i]._id}`} className='fs-5 text-danger'><MdEditNote /></Link> 
                <button 
                    to="" 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(couponState[i]._id)}    //the id is taken from the couponState and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>   { /* ms stands for "margin start" */ }
            </>),
        });
    }

    const deleteCoupon = (e) => {
        dispatch(deleteACoupon(e));     //e is the id of the coupon to be deleted //from deleteACoupon function in couponSlice.js this will pass to couponService.js deleteCoupon function
        setOpen(false);
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getCoupons());     //this is done to get the updated data after the delete action is performed
        },500);
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
            <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteCoupon(couponId)}}    //couponId is passed from state above
                title="Are You Sure You Want To Delete This Coupon?"
            />
        </div>
    )
}

export default CouponList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js