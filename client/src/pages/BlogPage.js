import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../components/BreadCrumbs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/blogSlice";

const SingleBlog = () => {
    const dispatch = useDispatch();

    const blogState = useSelector((state) => state.blog.TheBlog);
    //console.log(blogState);
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[2];

    useEffect(() => {
        getBlog();
    },[]);

    const getBlog = () => {
        dispatch(getABlog(getBlogId));
    };
return (
    <>
        <Meta title={blogState?.title} />
        <Breadcrumb title={blogState?.title} />
        <Container class1="blog-wrapper home-wrapper-2 py-5">
            <div className="row">
            <div className="col-12">
                <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                    <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{blogState?.title}</h3>
                <img src={blogState?.images[0].url ? blogState?.images[0].url : ""} className="img-fluid w-100 my-4" alt="blog" />
                <p dangerouslySetInnerHTML={{__html: blogState?.description}}></p>
                </div>
            </div>
            </div>
        </Container>
    </>
);
};

export default SingleBlog;
