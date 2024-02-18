import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        status: `London, Park Lane no. ${i}`,
    });
}

const Inquiries = () => {
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