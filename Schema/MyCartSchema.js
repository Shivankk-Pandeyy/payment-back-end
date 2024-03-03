const mongoose=require('mongoose');
const MyCartSchema=new mongoose.Schema({
    user_id:{
        type:String,
        require:true,
    },
    name_of_pdf:{
        type:String,
        require:true,
    },
    price_of_pdf:{ 
        type:String,
        require:true,
    },
    location_of_pdf:{
        type:String,
    }, 
    pdf_id:{
        type:String,
        require:true,
    }
},{timestamps:true});
const MyCart=mongoose.model("MYCART",MyCartSchema);
module.exports=MyCart;