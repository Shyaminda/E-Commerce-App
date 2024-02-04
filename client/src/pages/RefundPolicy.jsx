import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import Container from '../components/Container';

const RefundPolicy = () => {
    return (
    <>
        <Meta title="Refund policy" />
        <BreadCrumbs title="Refund policy" />
        <Container class1="policy-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="policy">
                        
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default RefundPolicy