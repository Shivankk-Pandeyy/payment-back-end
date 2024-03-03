const mongoose=require('mongoose');
const MyPlanSchema=new mongoose.Schema({
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
const MyPlan=mongoose.model("MYPLAN",MyPlanSchema);
module.exports=MyPlan;