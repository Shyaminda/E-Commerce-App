import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import Container from '../components/Container';

const Wishlist = () => {
    return (
    <>
        <Meta title="Wishlist" />
        <BreadCrumbs title="Wishlist" />
        <Container class1="wishlist-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-3">
                    <div className="wishlist-card position-relative ">
                        <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                        <div className="wishlist-card-image">
                            <img src="images/watch.jpg" alt="watch" className='img-fluid w-100' />
                        </div>
                        <div className='py-3 px-2'>
                            <h5 className='title'>Samsung s24 Ultra 12GB Ram Amoeled Display</h5>
                            <h6 className='price'>$ 100</h6>
                        </div>      
                    </div>
                </div>
                <div className="col-3">
                    <div className="wishlist-card position-relative">
                        <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                        <div className="wishlist-card-image">
                            <img src="images/watch.jpg" alt="watch" className='img-fluid w-100' />
                        </div>
                        <div className='py-3 px-2'>
                            <h5 className='title'>Samsung s24 Ultra 12GB Ram Amoeled Display</h5>
                            <h6 className='price'>$ 100</h6>
                        </div>      
                    </div>
                </div>
                <div className="col-3">
                    <div className="wishlist-card position-relative">
                        <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' />
                        <div className="wishlist-card-image">
                            <img src="images/watch.jpg" alt="watch" className='img-fluid w-100' />
                        </div>
                        <div className='py-3 px-2'>
                            <h5 className='title'>Samsung s24 Ultra 12GB Ram Amoeled Display</h5>
                            <h6 className='price'>$ 100</h6>
                        </div>      
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Wishlist;

//todo: refer the commit wishlist error