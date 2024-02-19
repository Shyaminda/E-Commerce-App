import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getProductCategories } from '../feature/productCategory/productCatSlice';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,    //sorting the name took from ant design
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const CategoryList = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProductCategories());
    },[dispatch]);
    const productCat = useSelector((state) => state.productCat.productCat);   //state.productCat is same as the productCat in the store.js   and the "productCat" is same as the "productCat" in the initialState name array in the productCatSlice.js
    const data1 = [];
    for (let i = 0; i < productCat.length; i++) {
        data1.push({
            key: i+1,
            title: productCat[i].title,
            action:(<>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }
    
    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default CategoryList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js