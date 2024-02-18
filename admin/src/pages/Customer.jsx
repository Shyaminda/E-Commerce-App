import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../feature/customer/customerSlice';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: "Name",
        dataIndex: "name",
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
];


const Customers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const customerState = useSelector(state => state.customer.customers);    //state.customer is used to get data from the store   //"customers" is the array in the customerSlice.js
    const data1 = [];
        for (let i = 0; i < customerState.length; i++) {
        if(customerState[i].role !== "admin"){
            data1.push({
                key: i + 1,
                name: customerState[i].firstName + " " + customerState[i].lastName,
                email: customerState[i].email,
                mobile: customerState[i].mobile,
            });
        }
    }

    return (
        <div>
            <h3 className="mb-4 title">Customers</h3>
            <div>
                <Table

                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default Customers;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js