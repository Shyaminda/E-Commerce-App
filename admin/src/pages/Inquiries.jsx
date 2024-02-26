import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteAInquiry, getInquiries, updateAInquiry } from '../feature/inquiries/inquirySlice';
import { FaRegEye } from "react-icons/fa";
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
    const [open, setOpen] = useState(false);
    const [inquiryId, setInquiryId] = useState("");   //this is done to get the id of the brand to be deleted
    const showModal = (e) => {
        setOpen(true);
        setInquiryId(e)
    };
    //console.log(brandId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };

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
                    <select
                        name=""
                        defaultValue={inquiryState[i].status ? inquiryState[i].status : "Submitted"}
                        className="form-control form-select"
                        id=""
                        onChange={(e) => setInquiryStatus(e.target.value, inquiryState[i]._id)}
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </>
            ),
            action:(<>
                <Link to={`/admin/view-inquiries/${inquiryState[i]._id}`} className='fs-5 ms-3 text-danger'><FaRegEye /></Link>   { /* ms stands for "margin start" */ }
                <button 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(inquiryState[i]._id)}    //the id is taken from the brandState and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>   { /* ms stands for "margin start" */ }
            </>),
        });
    }

    const setInquiryStatus = (e, i) => {
        //console.log(e, i);
        const data = { id: i, inquiryData: e };
        dispatch(updateAInquiry(data));
    };

    const deleteInquiry = (e) => {
        dispatch(deleteAInquiry(e));
        setOpen(false);
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getInquiries());     //this is done to get the updated data after the delete action is performed
        },500);
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
        <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteInquiry(inquiryId)}}    //brandId is passed from state above
                title="Are You Sure You Want To Delete This Inquiry?"
            />
    </div>
    )
}

export default Inquiries;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js