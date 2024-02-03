import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import Color from '../components/Color';

const CompareProducts = () => {
    return (
    <>
        <Meta title="Compare Products" />
        <BreadCrumbs title="Compare Products" />
        <div className="compare-products-wrapper py-5 home-wrapper-2">
            <div className="container-lg">
                <div className="row">
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                        <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                            <div className='product-card-image'>
                                <img src="images/watch.jpg" alt="watch" />
                            </div>
                            <div className='compare-product-details'>
                                <h5 className="title">Samsung s24 Ultra 12GB Ram Amoeled Display</h5>
                                <h6 className="price mb-2">$300</h6>
                            </div>
                            <div className='fw-semibold'>
                                <div className='product-detail'>
                                    <h6>Brand:</h6>
                                    <p>Samsung</p>
                                </div>
                                <div className='product-detail'>
                                    <h6>Type:</h6>
                                    <p>Watch</p>
                                </div>
                                <div className='product-detail'>
                                    <h6>Availability:</h6>
                                    <p>In Stock</p>
                                </div>
                                <div className='product-detail'>
                                    <h6>Colour:</h6>
                                    <Color />
                                </div>
                                <div className='product-detail'>
                                    <h6>Size:</h6>
                                    <div className='d-flex gap-10'>
                                        <p>S</p>
                                        <p>M</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                        <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                            <div className='product-card-image'>
                                <img src="images/watch.jpg" alt="watch" />
                            </div>
                            <div className='compare-product-details'>
                                <h5 className="title">Samsung s24 Ultra 12GB Ram Amoeled Display</h5>
                                <h6 className="price mb-2">$300</h6>
                            </div>
                            <div className='fw-semibold'>
                                <div className='product-detail'>
                                    <h6>Brand:</h6>
                                    <p>Samsung</p>
                                </div>
                                <div className='product-detail'>
                                    <h6>Type:</h6>
                                    <p>Watch</p>
                                </div>
                                <div className='product-detail'>
                                    <h6>Availability:</h6>
                                    <p>In Stock</p>
                                </div>
                                <div className='product-detail'>
                                    <h6>Colour:</h6>
                                    <Color />
                                </div>
                                <div className='product-detail'>
                                    <h6>Size:</h6>
                                    <div className='d-flex gap-10'>
                                        <p>S</p>
                                        <p>M</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default CompareProducts;