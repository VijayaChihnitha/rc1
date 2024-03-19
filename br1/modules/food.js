import mongoose from "mongoose";
const Schema=mongoose.Schema;
let formSchema=new Schema({
    profilepic:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },    
    price:{
        type:String,
        required:true
    },
});
export default mongoose.model("form",formSchema);