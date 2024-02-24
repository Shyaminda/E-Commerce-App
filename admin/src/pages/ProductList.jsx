import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../feature/product/productSlice';
import { Link } from 'react-router-dom';
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,    //sorting the name took from ant design
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,    //sorting the name took from ant design
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,    //sorting the name took from ant design
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
    
];

const ProductList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const productState = useSelector((state) => state.product.products);    //"products" is the "state.products = action.payload;" in the productSlice.js    //state.product is same as the product in the store.js
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        //const color = Array.isArray(productState[i].color) ? productState[i].color.map(c => c.color).join(', ') : productState[i].color.color;    //this is done because of the error:Objects are not valid as a React child (found: object with keys {_id, color}). If you meant to render a collection of children, use an array instead.
        data1.push({
            key: i+1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color,
            price: productState[i].price,
            action:(<>
                <Link to="" className='fs-5 text-danger'><MdEditNote /></Link> 
                <Link to="" className='fs-5 ms-3 text-danger'><MdOutlineDeleteOutline /></Link>   { /* ms stands for "margin start" */ }
            </>),
        });
    }

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


export default ProductList;

//dashboard- navigation of BlogList,Inquiries is done in MainLayout.jsx where the key value of MainLayout.jsx is same as the path value of the BlogList,Inquiries.jsx in App.js