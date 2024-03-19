// //this is schema
import mongoose from "mongoose";
const Schema=mongoose.Schema;
let userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
    
});
export default mongoose.model("user",userSchema);
