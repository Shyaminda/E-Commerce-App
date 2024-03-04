import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
    const {id,title,description,images,date} = props;
    return (
        <div className="blog-card">
            <div className="card-image">
                <img src={images} alt="blog" className='img-fluid w-100' />
            </div>
            <div className="blog-content">
                <p className="date">{date}</p>
                    <h5 className="title">{title}</h5>
                    <p className="description" dangerouslySetInnerHTML={{__html: description?.substr(0,80) + "..."}}></p>
                    <Link to={"/blog/" + id} className='button'>READ MORE</Link>   
            </div>
        </div>
    )
}

export default BlogCard