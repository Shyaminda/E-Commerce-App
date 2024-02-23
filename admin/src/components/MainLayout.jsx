import React, { useState } from 'react';
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDashboard } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { TbBrandHeadlessui } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { BiSolidColorFill } from "react-icons/bi";
import { MdOutlineBorderColor } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import { FaBlogger } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return (
    <div>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='logo'>
                    <h3 className='text-white text-center py-3 mb-0'>
                        <span className='sm-logo'>P.</span>
                        <span className='lg-logo'>Prime</span>
                    </h3>
                </div>
                <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['']}
                        onClick={({key})=>{
                        if(key === "signout"){

                        } else {
                            navigate(key);   // This is how we navigate to different pages with in the dashboard, in link with same address as BlogList, Inquiries, etc.
                        }
                        }}
                        items={[
                        {
                            key: '',
                            icon: <MdDashboard />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <CiUser />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <MdDashboard />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <IoIosCart />,
                                    label: 'Add products',
                                },
                                {
                                    key: 'product-list',
                                    icon: <IoIosCart />,
                                    label: 'Product Lists',
                                },
                                {
                                    key: 'brand',
                                    icon: <TbBrandHeadlessui />,
                                    label: 'Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <TbBrandHeadlessui />,
                                    label: 'Brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <MdOutlineCategory />,
                                    label: 'Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <MdOutlineCategory />,
                                    label: 'Category List',
                                },
                                {
                                    key: 'color',
                                    icon: <BiSolidColorFill />,
                                    label: 'Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <BiSolidColorFill />,
                                    label: 'Color List',
                                }
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <MdOutlineBorderColor />,
                            label: 'Orders',
                        },
                        {
                            key: 'blog',
                            icon: <FaBlogger />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'add-blog',
                                    icon: <GrBlog />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <ImBlog />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <GrBlog />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <ImBlog />,
                                    label: 'Blog Category List',
                                }
                            ]
                        },
                        {
                            key: 'inquiries',
                            icon: <TbPhoneCall />,
                            label: 'Inquiries',
                        },
                    ]}
                    />
            </Sider>
        <Layout>
            <Header
                className="d-flex justify-content-between ps-1 pe-4"
                style={{
                    padding: 0,
                }}
                >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: 'white',
                }}
            />
            <div className='d-flex gap-3 align-items-center'>
                <div className='position-relative'>
                    <IoMdNotifications className='fs-4 text-white' />
                    <span className='badge bg-warning rounded-circle position-absolute px-1 text-secondary'>1</span>
                </div>
                <div className='d-flex gap-3 align-items-center dropdown'>
                    <div>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile" className="rounded-circle" style={{width: '32px', height: '32px'}} />
                    </div>
                    <div role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <h5 className='text-light mb-0'>chamika</h5>
                        <p className='text-light mb-0'>chamika@gmail.com</p>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                            <Link
                                className="dropdown-item"
                                style={{ height: "auto", lineHeight: "15px" }}
                                to="/"
                            >
                            View Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown-item"
                                style={{ height: "auto", lineHeight: "15px" }}
                                to="/"
                            >
                                SignOut
                            </Link>
                        </li>
                    </div>
                </div>
            </div>
            </Header>
            <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
            >
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
            <Outlet />  
            </Content>
        </Layout>
        </Layout>
    </div>
    )
}

export default MainLayout;