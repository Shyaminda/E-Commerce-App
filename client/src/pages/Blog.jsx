import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';

const Blog   = () => {
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
                        <div className="col-6 mb-3">
                            <BlogCard />
                        </div>
                        <div className="col-6 mb-3">
                            <BlogCard />
                        </div>
                        <div className="col-6 mb-3">
                            <BlogCard />
                        </div>
                        <div className="col-6 mb-3">
                            <BlogCard />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Blog;