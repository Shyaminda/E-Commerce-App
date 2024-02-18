import React from 'react';
import { Table } from 'antd';
// import { MdEditNote } from "react-icons/md";
// import { MdOutlineDeleteOutline } from "react-icons/md";

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

const ProductList = () => {
    return (
        <div>
            <h3 className="mb-4 title">Products</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}
//<MdEditNote />
//<MdOutlineDeleteOutline />

export default ProductList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js