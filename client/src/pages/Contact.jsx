import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { MdOutlineHome } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";

const Contact = () => {
    return (
    <>
        <Meta title="Contact Us" />
        <BreadCrumbs title="Contact Us" />
        <div className="contact-wrapper py-5 home-wrapper-2">
            <div className="container-lg">
                <div className="row">
                    <div className="col-12">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15846.07519758786!2d80.04231435!3d6.82822225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1706946931004!5m2!1sen!2slk" 
                            width="600" 
                            height="450" 
                            className='border-0 w-100' 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div className='col-12 mt-5'>
                        <div className="contact-inner-wrapper d-flex justify-content-between">
                            <div>
                                <h3 className='contact-title mb-4'>Contact</h3>
                                <form className='d-flex flex-column gap-10'>
                                    <div>
                                        <input type="text" placeholder="Name" className='form-control mb-3' />
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email" className='form-control mb-3' />
                                    </div>
                                    <div>
                                        <input type="tel" placeholder="Mobile Number" className='form-control mb-3' />
                                    </div>
                                    <div>
                                        <textarea name='' id='' cols={30} rows={5} placeholder="Comments" className='form-control mb-3 w-100' />
                                    </div>
                                    <div>
                                        <button className='button'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className='contact-title'>Get in touch</h3>
                                <div>
                                    <ul className='ps-0'>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <MdOutlineHome className='fs-5' />
                                            <address className='mb-0'>123, Main Street, Colombo 01</address>   {/* here if we don't use mb-0 icon and the text doesn't align properly */}
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoCall className='fs-5' />
                                            <a href="tel:+94123456789">+94 123 456 789</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoIosMail className='fs-5' />
                                            <a href="mailto:chamika@gmail.com">chamika@gmail.com</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoInformationCircle className='fs-5' />
                                            <p className='mb-0'>Monday - Friday 10AM - 10PM</p>
                                        </li>
                                    </ul>
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

export default Contact