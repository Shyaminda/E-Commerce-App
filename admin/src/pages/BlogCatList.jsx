import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getBlogCategories } from '../feature/blogCategory/blogCatSlice';

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

const BlogCatList = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBlogCategories());
    },[dispatch]);

    const blogCatState = useSelector((state) => state.blogCat.blogCat);   //state.blogCat is same as the blogCat in the store.js   and the "productCat" is same as the "blogCat" in the initialState name array in the blogCatSlice.js
    const data1 = [];
    for (let i = 0; i < blogCatState.length; i++) {
        data1.push({
            key: i+1,
            title: blogCatState[i].title,
            action:(<>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Blog Categories</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default BlogCatList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js