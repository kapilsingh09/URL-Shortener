import mongoose from "mongoose";


const short_URL_schmea = new mongoose.Schema({
    full_url:{
        required:true,
        type:String,
    },
    short_url:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }
})

const short_URL = mongoose.model("short_URL",short_URL_schmea)
export default short_URL