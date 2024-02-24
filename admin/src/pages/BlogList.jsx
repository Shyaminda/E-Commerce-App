import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getBlogs } from '../feature/blog/blogSlice';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const BlogList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);
    
    const blogState = useSelector((state) => state.blog.blogs);     //state.blog is same as the blog in the store.js   and the "blogs" is same as the "blogs" in the brandSlice.js "state.blogs = action.payload;"
    const data1 = [];
    for (let i = 0; i < blogState.length; i++) {
        data1.push({
            key: i+1,
            title: blogState[i].title,
            category: blogState[i].category,
            action:(<>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Blog Lists</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
        </div>
    )
}

export default BlogList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js