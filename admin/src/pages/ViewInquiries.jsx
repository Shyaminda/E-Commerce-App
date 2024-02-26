import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {getAInquiry,resetState,updateAInquiry,} from "../feature/inquiries/inquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewInquiries = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getInquiryId = location.pathname.split("/")[3];   //this is done to get the id of the inquiry to be viewed

    const inquiryState = useSelector((state) => state.inquiry);
    const { inquiryName, inquiryMobile, inquiryEmail, inquiryComment, inquiryStatus } = inquiryState;

    useEffect(() => {
        dispatch(getAInquiry(getInquiryId));
    }, [ getInquiryId, dispatch,]);

    const goBack = () => {
        navigate(-1);
    };
    const setEnquiryStatus = (e, i) => {
        //console.log(e, i);
        const data = { id: i, inquiryData: e };
            dispatch(updateAInquiry(data));
            dispatch(resetState());

            setTimeout(() => {
            dispatch(getAInquiry(getInquiryId));
            }, 500);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Inquiry</h3>
            <button
            className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
            onClick={goBack}
            >
            <BiArrowBack className="fs-5" /> Go Back
            </button>
        </div>
        <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
            <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Name:</h6>
                <p className="mb-0">{inquiryName}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Mobile:</h6>
                <p className="mb-0">
                    <a href={`tel:+91${inquiryMobile}`}>{inquiryMobile}</a>
                </p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Email:</h6>
                <p className="mb-0">
                    <a href={`mailto:{enqEmail}`}>{inquiryEmail}</a>
                </p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Comment:</h6>
                <p className="mb-0">{inquiryComment}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Status:</h6>
                <p className="mb-0">{inquiryStatus}</p>
            </div>
                <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Change Status:</h6>
            <div>
                <select
                    name=""
                    defaultValue={inquiryStatus ? inquiryStatus : "Submitted"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setEnquiryStatus(e.target.value, getInquiryId)}   //what here happens is that the value of the select is passed to the setEnquiryStatus function and the id of the inquiry is also passed to the setEnquiryStatus function
                >
                    <option value="Submitted">Submitted</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>
            </div>
        </div>
            </div>
        )
}

export default ViewInquiries;