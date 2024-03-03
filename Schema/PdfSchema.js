const mongoose=require('mongoose');
const pdfSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        default:10,
        require:true,
    },
    pdf:{
        type:String,
        require:true,
    }
},{timestamps:true});
const PDF=mongoose.model("PDF",pdfSchema);
module.exports=PDF;