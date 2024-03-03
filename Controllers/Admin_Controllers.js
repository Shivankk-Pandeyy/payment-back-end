const User=require('../Schema/UserSchema');
const PDF=require('../Schema/PdfSchema');
//GET ALL MEMBERS REQUEST
const getAllMembers=async(req,res)=>{
    try{
        const user=await User.find({},{password:0})
        if(!user || user.length===0){
            return res.status(400).json({message:"NO MEMBERS HAVE REGISTERED"});
        }
        return res.status(200).json(user)
    }
    catch(err){
        console.log(err);
    }
}
//DELETE USER
const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({message:"DELETED"});
    }
    catch(err){
        console.log(err);
    }
}
//GET PDF
const GetPdfs=async(req,res)=>{
    try{
        const pdfs=await PDF.find({});
        res.status(200).json({pdfs});
    }
    catch(err){
        CSSConditionRule.log(err)
    }
    
}
//delete pdf
const deletePdf=async(req,res)=>{
    const id=req.params.id;
    try{
        const pdfdummy=await PDF.findByIdAndDelete({_id:id})
        return res.status(200).json({message:"PDF DELETED"});
    }
    catch(err){
        console.log(err);
    }
}
module.exports={getAllMembers,deleteUser,GetPdfs,deletePdf};