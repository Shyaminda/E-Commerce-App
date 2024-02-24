import React, { useEffect, useState} from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../feature/brand/brandSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CustomModal from '../components/CustomModal';

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

const BrandList = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState("");   //this is done to get the id of the brand to be deleted
    const showModal = (e) => {
        setOpen(true);
        setBrandId(e)
    };
    //console.log(brandId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState()); //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        dispatch(getBrands());
    },[dispatch]);

    const brandState = useSelector((state) => state.brand.brands);    //state.brand is same as the brand in the store.js   and the "brands" is same as the "brands" in the brandSlice.js "state.brands = action.payload;"
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i+1,
            title: brandState[i].title,
            action:(<>
                <Link to={`/admin/brand/${brandState[i]._id}`} className='fs-5 text-danger'><MdEditNote /></Link> 
                <button 
                    to="" 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(brandState[i]._id)}    //the id is taken from the brandState and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>   
            </>),
        });
    }

    const deleteBrand = (e) => {
        dispatch(deleteABrand(e));
        setOpen(false);
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getBrands());     //this is done to get the updated data after the delete action is performed
        },500);
    }

    return (
        <div>
            <h3 className="mb-4 title">Brands</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
            <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteBrand(brandId)}}    //brandId is passed from state above
                title="Are You Sure You Want To Delete This Brand?"
            />
        </div>
    )
}

export default BrandList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js