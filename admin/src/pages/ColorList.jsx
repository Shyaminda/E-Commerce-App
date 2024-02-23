import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getColors } from '../feature/color/colorSlice';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getColors());
    },[dispatch]);

    const colorState = useSelector((state) => state.color.colors);  //state.color is same as the color in the store.js   and the "colors" is same as the "colors" in the initialState name array in the colorSlice.js
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i+1,
            name: colorState[i].name,
            action:(<div>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </div>),
        });
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
        </div>
    )
}

export default ColorList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js