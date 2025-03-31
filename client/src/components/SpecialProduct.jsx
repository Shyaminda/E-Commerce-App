import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
    const { id,title,price,brand,totalRatings,sold,quantity,data } = props;
    return (
        <div className='col-6 mb-3'>
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    {Array.isArray(data) && data?.map((item, index) => (
                        <div key={index}>
                            <img src={item.images[0].url} alt="watch" className='img-fluid' />
                        </div>
                    ))}
                    <div className='special-product-content'>
                        <h5 className="brand">{brand}</h5>
                        <h6 className="title">{title}</h6>
                        <ReactStars
                            count={5}
                            size={10}
                            value={totalRatings}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className="price"><span className='price red-p'>$ {price}</span> &nbsp;<strike>$200</strike></p>
                        <div className='discount-till d-flex align-items-center gap-5'><p className='mb-0'><b>5 </b> Days</p>
                            <div className='d-flex gap-1 align-items-center'>
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>
                            </div>
                        </div>
                        <div className="product-count my-3">
                            <p>Products: {quantity}</p>
                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin={quantity} aria-valuemax={sold + quantity}>    {/* a percentage calculation is done in the tutorial https://www.youtube.com/watch?v=b3N25xOKrng&list=PL0g02APOH8okXhOQLOLcB_nifs1U41im5&index=24 at 12.30 */}
                                <div className="progress-bar" style={{width: "25%"}}></div>
                            </div>
                        </div>
                        <Link to={`/product/${id}`} className="button">View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct;