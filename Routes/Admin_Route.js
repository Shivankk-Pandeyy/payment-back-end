const express=require('express');
const router=express.Router();
const multer=require('multer')
const PDF=require('../Schema/PdfSchema');
//GET FUNCTION CALL FROM CONTROLLERS
const {getAllMembers,deleteUser,GetPdfs,deletePdf}=require("../Controllers/Admin_Controllers")
//RESTFUL APIs
router.route("/getAllMembers").get(getAllMembers);
router.route("/DeleteUser/:id").delete(deleteUser);
//UPLOADING THE PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './files')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null,uniqueSuffix+file.originalname)
    }
})
const upload = multer({ storage: storage })
//UPLOADING PDFS
router.route("/UploadPdf").post(upload.single("file"),async(req,res)=>{
    const {title,price}=req.body;
    const {filename}=req.file;
    try {
        const pdfs=await new PDF({
            name:title,
            price:price,
            pdf:filename
        })
        await pdfs.save();
        return res.status(200).json({message:"FILES POSTED"})
    } 
    catch(err) {
        console.log(err);
    }
})
//DISPLAY PDF
router.route("/GetPdfs").get(GetPdfs);
//DELETE PDF
router.route("/deletePdf/:id").delete(deletePdf);
module.exports=router