import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const SpecialProduct = () => {
    return (
        <div className='col-6 mb-3'>
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div>
                        <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                    </div>
                    <div className='special-product-content'>
                        <h5 className="brand">Apple</h5>
                        <h6 className="title">Apple watch 3 new advance...</h6>
                        <ReactStars
                            count={5}
                            size={10}
                            value={4}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className="price"><span className='price red-p'>$100</span> &nbsp;<strike>$200</strike></p>
                        <div className='discount-till d-flex align-items-center gap-5'><p className='mb-0'><b>5 </b> Days</p>
                            <div className='d-flex gap-1 align-items-center'>
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>
                            </div>
                        </div>
                        <div className="product-count my-3">
                            <p>Products: 5</p>
                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{width: "25%"}}></div>
                            </div>
                        </div>
                        <Link className="button">Add to Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct;