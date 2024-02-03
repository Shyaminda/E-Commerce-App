import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = (props) => {
    const { title } = props;
    return (
        <div className='breadcrumbs mb-0 py-4'>
            <div className="container-lg">
                <div className="row">
                    <div className="col-12">
                        <p className='text-center'>
                            <Link to="/" className='text-dark'>Home &nbsp;</Link> / {title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumbs;