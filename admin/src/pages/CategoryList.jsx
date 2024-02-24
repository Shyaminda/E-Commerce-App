import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteAProductCategory, getProductCategories } from '../feature/productCategory/productCatSlice';
import CustomModal from '../components/CustomModal';
import { resetState } from '../feature/product/productSlice';

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
    const [open, setOpen] = useState(false);
    const [productCatId, setProductCatId] = useState("");   //this is done to get the id of the brand to be deleted
    const showModal = (e) => {
        setOpen(true);
        setProductCatId(e)
    };
    //console.log(productCatId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(resetState()); //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        dispatch(getProductCategories());
    },[dispatch]);

    const productCat = useSelector((state) => state.productCat.productCat);   //state.productCat is same as the productCat in the store.js   and the "productCat" is same as the "productCat" in the productCatSlice.js "state.productCat = action.payload;"
    const data1 = [];
    for (let i = 0; i < productCat.length; i++) {
        data1.push({
            key: i+1,
            title: productCat[i].title,
            action:(<>
                <Link to={`/admin/category/${productCat[i]._id}`} className='fs-5 text-danger'><MdEditNote /></Link> 
                <button 
                    to="" 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(productCat[i]._id)}    //the id is taken from the productCat and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>  { /* ms stands for "margin start" */ }
            </>),
        });
    }

    const deleteProductCategory = (e) => {
        dispatch(deleteAProductCategory(e));
        setOpen(false);
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getProductCategories());     //this is done to get the updated data after the delete action is performed
        },500);
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
            <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteProductCategory(productCatId)}}    //brandId is passed from state above
                title="Are You Sure You Want To Delete This Product Category?"
            />
        </div>
    )
}

export default CategoryList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js