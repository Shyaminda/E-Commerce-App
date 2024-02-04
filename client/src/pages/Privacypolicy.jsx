import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import Container from '../components/Container';

const Privacypolicy = () => {
    return (
    <>
        <Meta title="Privacy Policy" />
        <BreadCrumbs title="Privacy Policy" />
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

export default Privacypolicy;