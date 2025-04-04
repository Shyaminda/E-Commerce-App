import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from '../features/blog/blogSlice';
import moment from 'moment';

const Blog = () => {
    const blogState = useSelector((state) => state.blog.blog);
    //console.log(blogState);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllBlogs();
    },[]);

    const getAllBlogs = () => {
        dispatch(getBlogs());
    };
    
    return (
    <>
        <Meta title="Blogs" />
        <BreadCrumbs title="Blogs" />
        <Container class1="blog-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-3">
                    <div className='filter-card mb-3'>
                        <h3 className="filter-title">
                            Find By Categories
                        </h3>
                        <div className='ps-0'>
                            <ul>
                                <li>Watch</li>
                                <li>Tv</li>
                                <li>Camera</li>
                                <li>Laptop</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                    {
                        blogState && blogState?.map((item,index) => {
                            return(
                                <div className="col-6 mb-3" key={index}>
                                    <BlogCard 
                                        id={item?._id}
                                        title={item?.title}
                                        description={item?.description}
                                        images={item?.images[0].url}
                                        date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Blog;