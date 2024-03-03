const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
//USER SCHEMA
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true});
//JWT AUTHENTICATION
userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn:"1d"
        })
    }
    catch(err){
        console.log(err);
    };
}
//USER MODEL
const User=mongoose.model("User",userSchema);
module.exports=User;