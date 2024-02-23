import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisLiked:{
        type:Boolean,
        default:false,
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    disLikes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    images:[],
    author:{
        type:String,
        default:"Admin",
    } 
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true,
});

const Blog=mongoose.model('Blog',blogSchema);   
export default Blog;