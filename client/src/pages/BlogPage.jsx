import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const BlogPage = () => {
    return (
    <>
        <Meta title="Blog Page" />
        <BreadCrumbs title="Blog Page" />
        <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="blogPage-card">
                        <Link to="/blogs" className='d-flex align-align-items-center gap-10'><FaArrowLeft className='fs-7' />Go Back To Blogs</Link>
                            <h4 className="title">A Beautiful Sunday Morning</h4>
                            <img src="images/blog-1.jpg" alt="blog" className='img-fluid w-100 my-4' />
                            <p>In et accusamus. Qui et qui qui et qui ad. Ullam quia et nam maiores autem inventore repellendus. Sequi qui impedit mollitia commodi et. Perspiciatis ullam voluptatibus veritatis illo ut aspernatur. Inventore iure aut voluptatem explicabo ea.
                                Voluptatem reprehenderit incidunt earum expedita aut consequuntur commodi aut. Corrupti eius sunt atque labore nihil debitis voluptatibus. Aut ut doloremque maiores accusamus harum ut. Voluptatem quibusdam in dicta consequatur deserunt dolorem omnis. Voluptate in nihil eos reiciendis eos quis amet. Temporibus aperiam vel et aut ab aut iure omnis voluptates.
                                Nisi sapiente cupiditate maiores dolor repellendus. Quis in hic quia nemo iste eaque officiis beatae est. Architecto qui dolor.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default BlogPage;

//TODO: there is an issue where the images(all) are not being displayed in the blog page.