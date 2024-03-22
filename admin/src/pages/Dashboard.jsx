import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
// flex-grow-1 w-50import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { getIncomeData, getOrders, getYearlyData } from '../feature/auth/authSlice';

const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product Count',
        dataIndex: 'product',
    },
    {
        title: 'Total Price',
        dataIndex: 'price',
    },
    {
        title: 'Total Price after Discount',
        dataIndex: 'DiscountedPrice',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const Dashboard = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [monthlyDataSales, setMonthlyDataSales] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const dispatch = useDispatch();
    const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
    const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
    const orderState = useSelector((state) => state?.auth?.orders);

    useEffect(() => {
        dispatch(getIncomeData());
        dispatch(getYearlyData());
        dispatch(getOrders());
    }, [dispatch]);

    useEffect(() => {
        let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let data = [];
        let monthlyOrderCount = [];
        for (let i = 0; i < monthlyDataState?.length; i++) {
            const element = monthlyDataState[i];
            data.push({type: month[element?._id?.month], income: element?.amount});
            monthlyOrderCount.push({type: month[element?._id?.month], sales: element?.count});
        }
        setMonthlyData(data);
        setMonthlyDataSales(monthlyOrderCount);

        const data1 = [];
        for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i,
            name: orderState[i]?.user?.firstName + ' ' + orderState[i]?.user?.lastName,
            product: orderState[i]?.orderItems?.length,
            price: orderState[i]?.totalPrice,
            DiscountedPrice: orderState[i]?.totalPriceAfterDiscount,
            status: orderState[i]?.orderStatus,
        });
    }
    setOrderData(data1);
    }, [monthlyDataState,orderState]);

    const config = {
        data: monthlyData,
        xField: 'type',
        yField: 'income',
        color: ({ type }) => {
            return '#ffd333';
            //TODO: Change color
        },
        label: {
        //position: 'middle',
        style: {
            fill: '#FFFFFF',
            opacity: 1,
        },
        },
        xAxis: {
            label: {
            autoHide: true,
            autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Income',
            },
        },
    };
    //console.log(config);

    const config2 = {
        data: monthlyDataSales,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return '#ffd333';
            //TODO: Change color
        },
        label: {
        //position: 'middle',
        style: {
            fill: '#FFFFFF',
            opacity: 1,
        },
        },
        xAxis: {
            label: {
            autoHide: true,
            autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Sales',
            },
        },
    };

    return (
    <div>
        <h3 className="mb-4 title">Dashboard</h3>
        <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="d-flex p-3 justify-content-between align-items-end bg-white flex-grow-1 p-3 rounded-3">
                <div><p className='mb-0 desc'>Total Income</p>
                    <h4 className='mb-0 sub-title'>${yearlyDataState && yearlyDataState[0]?.amount}</h4> 
                </div>
                <div className='d-flex flex-column align-items-end'>
                    <h6 className='green'>{/*<FaArrowTrendUp /> 46%*/}</h6>
                    <p className='mb-0 desc'>Income in last year</p>
                </div>
            </div>
            <div className="d-flex p-3 justify-content-between align-items-end bg-white flex-grow-1 p-3 rounded-3">
                <div><p className='mb-0 desc'>Total Sales</p>
                    <h4 className='mb-0 sub-title'>{/* ${yearlyDataState[0]?.count} */}</h4>
                </div>
                <div className='d-flex flex-column align-items-end'>
                    <h6 className='red'>{/* <FaArrowTrendDown /> 46% */}</h6>
                    <p className='mb-0 desc'>Sales in last year</p>
                </div>
            </div>
            {/* <div className="d-flex justify-content-between align-items-end bg-white flex-grow-1 p-3 rounded-3">
                <div><p className='mb-0 desc'>Total</p><h4 className='mb-0 sub-title'>$1100</h4></div>
                <div className='d-flex flex-column align-items-end'>
                    <h6>46%</h6>
                    <p className='mb-0 desc'>Compared to January</p>
                </div>
            </div> */}
        </div>
        
        <div className='d-flex justify-content-between gap-3'>
            <div className="mt-4 flex-grow-1 w-50">
                <h3 className="mb-4">Sales Statistics</h3>
                <div>
                    {/* <Column {...config2} /> */}
                </div>
            </div>

            <div className="mt-4 flex-grow-1 w-50">
                <h3 className="mb-4">Income Statistics</h3>
                <div>
                    {/* <Column {...config} /> */}
                </div>
            </div>
        </div>

        <div className="mt-4">
            <h3 className="mb-4">Recent Orders</h3>
            <div>
                <Table
                    columns={columns} 
                    dataSource={orderData}
                />
            </div>
        </div>

        {/* <div className='mt-4'>
            <h3 className="mb-4">Recent reviews</h3>
            <div>
                <div></div>
                <div></div>
            </div>
        </div> */}
    </div>
    )
}

export default Dashboard;