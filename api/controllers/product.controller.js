import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import slugify from 'slugify';
import User from '../models/userModel.js';

const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){       // if title is provided, slugify it
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error, 'Product creation failed(createProduct product.controller.js)');
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if(req.body.title){       // if title is provided, slugify it
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        throw new Error(error, 'Product updating failed(updateProduct product.controller.js)');
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id, req.body, { new: true });
        res.json(deletedProduct);
    } catch (error) {
        throw new Error(error, 'Product deleting failed(updateProduct product.controller.js)');
    }
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProducts = await Product.findById(id);
        res.json(findProducts);
    } catch (error) {
        throw new Error(error, 'Product retrieving failed(getProduct product.controller.js)');
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        //filtering
        const queryObj = { ...req.query };    //Be cautious about directly using the req.query parameters in your database queries without proper validation. This could expose your application to NoSQL injection attacks
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);    // delete all the excludeFields from queryObj
        console.log(queryObj);

        const queryStr = JSON.stringify(queryObj);    // convert queryObj to string
        const queryStrWithDollarSign = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);    // replace gte, gt, lte, lt with $gte, $gt, $lte, $lt
        
        const query = Product.find(JSON.parse(queryStrWithDollarSign));  //http://localhost:3000/api/product?price[gte]=300&price[lte]=400 in postman  // find all the products that matches the queryObj  
                                                                        //http://localhost:3000/api/product?brand=apple&category=phone in postman
        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');    // split the query by comma and join them by space  
            query.sort(sortBy);     //query.sort("category brand") => sort by category ascending and then by brand ascending what happens
        } else {
            query.sort('-createdAt');    // sort by createdAt descending
        }    //http://localhost:3000/api/product?sort=category,brand in postman reason we split and join in above

        //field limiting

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');    // split the query by comma and join them by space  
            query.select(fields);     //query.select("title slug") => select only title and slug
        } else {
            query.select('-__v');    // select all the fields except __v   which can see in the mongodb
        }    //http://localhost:3000/api/product?fields=title,slug in postman reason we split and join in above
        // output=(
        //     {
        //         "_id": "65ae3552f8182da30f81a87f",
        //         "title": "msi laptop",
        //         "slug": "msi-laptop"
        //       },
        // )
        //http://localhost:3000/api/product?fields=-title,-slug in postman the minus sign means exclude that field

        //pagination
        const page = req.query.page;    // page number
        const limit = req.query.limit;  
        const skip = (page - 1) * limit;

        query.skip(skip).limit(limit);   // skip the first n number of products and limit the products to limit
        if(req.query.page){
            const productsCount = await Product.countDocuments();   // count the total number of products
            if(skip >= productsCount) throw new Error(error,'This page does not exist(product.controller.js getAllProducts)');   // if the skip is greater than the total number of products, throw an error
        }   //http://localhost:3000/api/product?page=1&limit=3 in postman    

        const products = await query;   // await the query  //query which will return from above filtration and sorting
        res.json(products);
        
    } catch (error) {
        throw new Error(error, 'Product retrieving failed(getAllProducts product.controller.js)');
    }
});

const addToWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;   // get the user id from the req.user object
    const { productId } = req.body;   // get the productId from the req.body   //if your client sends requests with the key id instead of productId, you should make sure to use the correct key in your server-side logic. Adjust the line to match the key used in your client requests
    try {
        const user = await User.findById(_id);    // find the user by id
        const alreadyAdded = user.wishList.find((id) => id.toString() === productId);   // check if the product is already added to the wishlist by comparing the productId with the wishlist array
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id,{
                $pull: { wishList: productId },   // if the product is already added, remove it from the wishlist
            },{ new: true });
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(_id,{
                $push: { wishList: productId },   // if the product is already added, remove it from the wishlist
            },{ new: true });
            res.json(user);
        }
    } catch (error) {
        throw new Error(error, 'Product adding to wishlist failed(addToWishList product.controller.js)');
    }
});

export { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList};


//for better query understanding watch the tutorial https://www.youtube.com/watch?v=S6Yd5cPtXr4&list=PL0g02APOH8okXhOQLOLcB_nifs1U41im5&index=6&t=513s at 3.05.22