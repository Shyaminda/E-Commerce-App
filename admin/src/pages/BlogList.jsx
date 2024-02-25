import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteABlog, getBlogs } from '../feature/blog/blogSlice';
import { resetState } from '../feature/product/productSlice';
import CustomModal from '../components/CustomModal';

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
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");   //this is done to get the id of the brand to be deleted
    const showModal = (e) => {
        setOpen(true);
        setBlogId(e)
    };
    //console.log(brandId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState()); //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
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
                <Link to={`/admin/blog/${blogState[i]._id}`} className='fs-5 text-danger'><MdEditNote /></Link> 
                <button 
                    to="" 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(blogState[i]._id)}    //the id is taken from the brandState and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>    { /* ms stands for "margin start" */ }
            </>),
        });
    }

    const deleteBlog = (e) => {
        dispatch(deleteABlog(e));
        setOpen(false);
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getBlogs());     //this is done to get the updated data after the delete action is performed
        },500);
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
            <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteBlog(blogId)}}    //brandId is passed from state above
                title="Are You Sure You Want To Delete This Blog?"
            />
        </div>
    )
}

export default BlogList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js