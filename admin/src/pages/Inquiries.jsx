import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getInquiries } from '../feature/inquiries/inquirySlice';

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
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Inquiries = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInquiries());
    },[dispatch]);

    const inquiryState = useSelector((state) => state.inquiry.inquiries);  //state.inquiry is same as the color in the store.js   and the "inquiries" is same as the "inquiries" in the initialState name array in the inquirySlice.js
    const data1 = [];
    for (let i = 0; i < inquiryState.length; i++) {
        data1.push({
            key: i+1,
            name: inquiryState[i].name,
            email: inquiryState[i].email,
            mobile: inquiryState[i].mobile,
            comment: inquiryState[i].comment,
            date: inquiryState[i].createdAt,
            status: (
                <>
                    <select name='' className='form-control form-select' id=''>
                        <option value=''>set status</option>
                    </select>
                </>
            ),
            action:(<>
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }
    return (
    <div>
        <h3 className="mb-4 title">Inquiries</h3>
        <div>
            <Table
                columns={columns} 
                dataSource={data1}
            />
        </div>
    </div>
    )
}

export default Inquiries;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js