import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = () => {
    return (
        <div className="blog-card">
            <div className="card-image">
                <img src=" images/blog-1.jpg" alt="blog" className='img-fluid w-100' />
            </div>
            <div className="blog-content">
                <p className="date">29 jan, 2024</p>
                    <h5 className="title">beautiful sunday morning</h5>
                    <p className="description">lorem Voluptatem itaque in quasi. Soluta perspiciatis et inventore sit dolor odio. Sequi reiciendis id dicta qui at et. Animi ad sapiente officia nesciunt est repudiandae ut.</p>
                    <Link to="blog/:id" className='button'>READ MORE</Link>   
            </div>
        </div>
    )
}

export default BlogCard