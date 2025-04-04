import React, { useEffect } from 'react';
import { useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../features/products/productSlice';

const OurStore = () => {
    const [grid, setGrid] = useState(4);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags,setTags] = useState([]);
    //const [colors,setColors] = useState([]);

    //filter states
    const [tag, setTag] = useState(null);   //This is the state that will be used to filter the products based on the brand or category or tag. It will be passed to the ProductCard component as a prop to filter the products based on the brand or category or tag.
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    //const [color,setColor] = useState(null);
    //console.log(sort);

    const productState = useSelector((state) => state.product.product);
    //console.log(productState);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllProducts();
    },[sortBy,tag,category,brand,minPrice,maxPrice]);   //todo: trying doing this for the previous error commits

    const getAllProducts = () => {
        dispatch(getProducts({sortBy,tag,category,brand,minPrice,maxPrice}));
    };

    useEffect(() => {
        let newBrands = [];
        let category = [];
        let newTags = [];
        let newColors = [];
        for(let i = 0; i < productState?.length; i++){
            const element = productState[i];
            newBrands.push(element?.brand);
            category.push(element?.category);
            newTags.push(element?.tags);
            //newColors.push(element?.color);
        }
        setBrands(newBrands);
        setCategories(category);
        setTags(newTags);
        //setColors(newColors);
    },[productState]);
    //console.log([...new Set(brands)],[...new Set(categories)],[...new Set(tags)]);      //This creates a new Set object, which is a collection of unique values. When you pass an array to new Set(), it creates a Set containing only the unique values from that array. Duplicates are automatically removed.

return (
    <div>
        <Meta title="Our Store" />
        <BreadCrumbs title="Our Store" />
        <Container class1="store-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-3">
                    <div className='filter-card mb-3'>
                        <h3 className="filter-title">
                            Shop By Categories
                        </h3>
                        <div className='ps-0'>
                            <ul>
                            {
                                categories && [...new Set(categories)].map((item,index) => {           
                                    return (
                                        <li key={index} onClick={()=> setCategory(item)}>{item}</li>   //This creates a new Set object, which is a collection of unique values. When you pass an array to new Set(), it creates a Set containing only the unique values from that array. Duplicates are automatically removed.
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>

                    <div className='filter-card mb-3'>
                        <h3 className="filter-title">Filter By</h3>
                        <div>
                            <h5 className="sub-title">Availability</h5>
                            <div>
                                {/* <div className="form-check d-flex align-items-center gap-1">
                                    <input className="form-check-input checkbox-lg" type="checkbox" value="" id="" />
                                    <label className="form-check-label" htmlFor="">
                                        In Stock(1)
                                    </label>
                                </div>
                                <div className="form-check d-flex align-items-center gap-1">
                                    <input className="form-check-input checkbox-lg" type="checkbox" value="" id="" />
                                    <label className="form-check-label" htmlFor="">
                                        Out Of Stock(0)
                                    </label>
                                </div> */}
                            </div>

                            <h5 className="sub-title">Price</h5>
                            <div className='d-flex align-items-center gap-10'>
                                <div className="form-floating">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="" 
                                        placeholder="from"
                                        onChange={(e)=>setMinPrice(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">From</label>
                                </div>
                                <div className="form-floating">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="floatingInput1" 
                                        placeholder="to"
                                        onChange={(e)=>setMaxPrice(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput1">To</label>
                                </div>
                            </div>

                            {/* <h5 className="sub-title">Colours</h5>
                            <div>
                                <div>
                                    <Color />
                                </div>
                            </div> */}

                            {/* <h5 className="sub-title">Size</h5>
                            <div>
                                <div className="form-check d-flex align-items-center gap-1">
                                        <input className="form-check-input checkbox-lg" type="checkbox" value="" id="color-1" />
                                        <label className="form-check-label" htmlFor="">
                                            s (2)
                                        </label>
                                </div>
                                <div className="form-check d-flex align-items-center gap-1">
                                        <input className="form-check-input checkbox-lg" type="checkbox" value="" id="color-2" />
                                        <label className="form-check-label" htmlFor="">
                                            m (2)
                                        </label>
                                </div>
                            </div> */}
                            <div className='mt-4 mb-3'>
                                <h3 className="sub-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    {
                                        categories && [...new Set(tags)].map((item,index) => {           
                                            return (
                                                <span key={index} onClick={()=>setTag(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-3 px-3">
                                                    {item}
                                                </span>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    
                    <div className='mb-3'>
                        <h3 className="filter-title">Product Brands</h3>
                        <div>
                            <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                            {
                                brands && [...new Set(brands)].map((item,index) => {           
                                    return (
                                        <span key={index} onClick={()=>setBrand(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-3 px-3">
                                            {item}
                                        </span>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>

                    {/* <div className='filter-card mb-3'>
                        <h3 className="filter-title">Random Products</h3>
                        <div>
                            <div className="random-products mb-3 d-flex">
                                <div className="w-50">
                                    <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                                </div>
                                <div className='w-50'>
                                    <h5>The best smart wear.</h5>
                                    <ReactStars
                                        count={5}
                                        size={10}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700" 
                                    />
                                    <b>$ 300</b>
                                </div>
                            </div>

                            <div className="random-products d-flex">
                                <div className="w-50">
                                    <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                                </div>
                                <div className='w-50'>
                                    <h5>The best smart wear.</h5>
                                    <ReactStars
                                        count={5}
                                        size={10}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700" 
                                    />
                                    <b>$ 300</b>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='col-9'>
                    <div className="filter-sort-grid mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-10">
                                <p className="mb-0 fw-semibold d-block" style={{"width": "50px"}}>Sort By:</p>
                                <select name='' className='form-control form-select' id='' onChange={(e)=>setSortBy(e.target.value)}>
                                    {/* <option value='manual'>Featured</option> */}
                                    {/* <option value='best-selling' selected="selected">Best Selling</option> */}
                                    <option value='title'>Alphabetically, A-Z</option>
                                    <option value='-title'>Alphabetically, Z-A</option>   {/* The '-' sign is used to sort the products in descending order. */}
                                    <option value='price'>Price, Low to High</option>
                                    <option value='-price'>Price, High to Low</option>
                                    <option value='-created'>Date, Old to New</option>
                                    <option value='created'>Date, New to Old</option>
                                </select>
                            </div>
                            <div>
                                <div className="d-flex align-items-center gap-10">
                                    <p className="total-products mb-0 fw-semibold">21 Products</p>
                                    <div className='d-flex gap-10 align-items-center grid'>
                                        <img onClick={()=>{setGrid(3)}} src="images/gr4.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={()=>{setGrid(4)}} src="images/gr3.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={()=>{setGrid(6)}} src="images/gr2.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={()=>{setGrid(12)}} src="images/gr.svg" className='d-block img-fluid' alt="grid" />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-list pb-5">
                        <div className="d-flex flex-wrap gap-10"><ProductCard data={productState} grid={grid} /></div>     {/* if an error occur with not displaying the products in this page do data={productState ? productState : []} */}
                    </div>
                </div>
            </div>
        </Container>
    </div>
)
}

export default OurStore;