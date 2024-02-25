import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteABlogCategory, getBlogCategories } from '../feature/blogCategory/blogCatSlice';
import { resetState } from '../feature/product/productSlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

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
    const [open, setOpen] = useState(false);
    const [blogCatId, setBlogCatId] = useState("");   //this is done to get the id of the blogCategory to be deleted
    const showModal = (e) => {
        setOpen(true);
        setBlogCatId(e)
    };
    //console.log(blogCatId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(resetState()); //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        dispatch(getBlogCategories());
    },[dispatch]);

    const blogCatState = useSelector((state) => state.blogCat.blogCat);   //state.blogCat is same as the blogCat in the store.js   and the "blogCat" is same as the "blogCat" in the blogCatSlice.js "state.blogCat = action.payload;"
    const data1 = [];
    for (let i = 0; i < blogCatState.length; i++) {
        data1.push({
            key: i+1,
            title: blogCatState[i].title,
            action:(<>
                <Link to={`/admin/blog-category/${blogCatState[i]._id}`} className='fs-5 text-danger'><MdEditNote /></Link> 
                <button 
                    to="" 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(blogCatState[i]._id)}    //the id is taken from the blogCatState and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>   { /* ms stands for "margin start" */ }
            </>),
        });
    }

    const deleteBlogCat = (e) => {
        dispatch(deleteABlogCategory(e));
        setOpen(false);
        if (isSuccess && deleteABlogCategory) {
            toast.success("Blog Category Deleted Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getBlogCategories());     //this is done to get the updated data after the delete action is performed
        },500);
    }

    const newBlogCategory = useSelector((state) => state.blogCat); //"blogCat" should be same as store.js  //getting the state from blogCatSlice the whole brand state is taken here because we need to check the success and error of the blogCat
    const { isSuccess, isError } = newBlogCategory;
    
    
    return (
        <div>
            <h3 className="mb-4 title">Blog Categories</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
            <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteBlogCat(blogCatId)}}    //blogCatId is passed from state above
                title="Are You Sure You Want To Delete This Blog Category?"
            />
        </div>
    )
}

export default BlogCatList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js