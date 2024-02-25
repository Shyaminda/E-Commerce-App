import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteAColor, getColors } from '../feature/color/colorSlice';
import CustomModal from '../components/CustomModal';
import { resetState } from '../feature/product/productSlice';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,    //sorting the name took from ant design
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const ColorList = () => {
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState("");   //this is done to get the id of the brand to be deleted
    const showModal = (e) => {
        setOpen(true);
        setColorId(e)
    };
    //console.log(brandId);   //shows the id of the brand to be deleted
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState()); //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        dispatch(getColors());
    },[dispatch]);

    const colorState = useSelector((state) => state.color.colors);  //state.color is same as the color in the store.js   and the "colors" is same as the "colors" in the colorSlice.js "state.colors = action.payload;"
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i+1,
            name: colorState[i].name,
            action:(<div>
                <Link to={`/admin/color/${colorState[i]._id}`} className='fs-5 text-danger'><MdEditNote /></Link> 
                <button 
                    to="" 
                    className='fs-5 ms-3 text-danger bg-bg-transparent border-0'   // ms stands for "margin start"
                    onClick={() => showModal(colorState[i]._id)}    //the id is taken from the brandState and passed to the showModal function
                >    
                    <MdOutlineDeleteOutline />
                </button>   { /* ms stands for "margin start" */ }
            </div>),
        });
    }

    const deleteColor = (e) => {
        dispatch(deleteAColor(e));
        setOpen(false);
        
        setTimeout(() => {    //this is done to get the updated data after the delete action is performed and more instantly
            dispatch(getColors());     //this is done to get the updated data after the delete action is performed
        },500);
    }

    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={data1}
                />
            </div>
            <CustomModal 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteColor(colorId)}}    //brandId is passed from state above
                title="Are You Sure You Want To Delete This Color?"
            />
        </div>
    )
}

export default ColorList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js