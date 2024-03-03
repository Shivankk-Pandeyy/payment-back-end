const User=require('../Schema/UserSchema');
const bcrypt=require('bcryptjs');
const Razorpay = require('razorpay');
const dotenv=require("dotenv").config();
const PDF=require('../Schema/MyCartSchema');
const crypto=require("crypto");
const MYPLAN = require('../Schema/MyPlans');

//HOMEPAGE GET REQUEST
const getAllProducts=async(req,res)=>{
    try{
        return res.status(200).json({message:"Router Succesful"})
    }
    catch(err){
        console.log(err);
    }
}
//USER REGISTRATION
const userRegister=async(req,res)=>{
    const {name,email,password}=req.body;
    const dummy=await User.findOne({email});
    //HASHING THE PASSWORD
    const saltRound=10;
    const hashPassword=await bcrypt.hash(password,saltRound);
    if(dummy){
        return res.status(400).json({message:"EMAIL"});
    }
    else{
        try{ 
            const user=await new User({
                name,
                email,
                password:hashPassword,
            });
            await user.save();
            return res.status(200).json({message:"Registration Succesful",token:await user.generateToken(),userId:user._id.toString()});
        }
        catch(err){
            console.log(err);
        }
    }
}
//USER LOGIN
const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    const checkUser=await User.findOne({email});
    if(!checkUser){
        return res.status(400).json({message:"USER NOT FOUND"});
    }
        try{
            if(email==="UltimateRhino@RR.com" && password==="Shivank183$$"){
                return res.status(200).json({message:"ADMIN"})
            }
            const isPasswordValid=await bcrypt.compare(password,checkUser.password);
            if(isPasswordValid){
                return res.status(200).json({message:"LOGIN"})
            }
            else{
                return res.status(400).json({message:"INVALID CREDENTIALS"})
            }
        }
        catch(err){
            console.log(err);
        }
}
//GET USERS
const getAllUsers=async(req,res)=>{
    try{
        const user=await User.find({});
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
}
//ADD TO CART
const addToCart=async(req,res)=>{
    const {user_id,name_of_pdf,price_of_pdf,location_of_pdf,pdf_id}=req.body;
    // console.log(req.body);
    const dummy=await PDF.findOne({user_id,pdf_id});
    if(dummy){
        res.status(400).json({message:"ALREADY ADDED TO CART"});
    }
    else{
        try{
            const cart=await new PDF({
                user_id,
                name_of_pdf,
                price_of_pdf,
                location_of_pdf,
                pdf_id,
            });
            await cart.save();
            res.status(200).json({message:"ADDED"})
        }
        catch(err){
            console.log(err);
        }
    }
}
//GET CART ITEMS
const getCartItems=async(req,res)=>{
    try{
        const pdf=await PDF.find({});
        res.json(pdf);
    }
    catch(err){
        console.log(err);
    }
}
//REMOVE FROM CART
const removeCart=async(req,res)=>{
    const id=req.params.id;
    try{
        await PDF.findByIdAndDelete({_id:id});
        return res.status(200).json({message:"DELETED"});
    }
    catch(err){
        console.log(err);
    }
}
//ITEM PURCHASED
const ItemsPurchased=async(req,res)=>{
    const {user_id,name_of_pdf,price_of_pdf,location_of_pdf,pdf_id}=req.body;
        try{
            const plan=await new MYPLAN({
                user_id,
                name_of_pdf,
                price_of_pdf,
                location_of_pdf,
                pdf_id,
            });
            await plan.save();
            res.status(200).json({message:"ADDED"})
        }
        catch(err){
            console.log(err);
        }
}
//GET PLANS AFTER BUYING
const GetPlans=async(req,res)=>{
    try{
        const plans=await MYPLAN.find({});
        res.json(plans);
    }
    catch(err){
        console.log(err);
    }
}
//DELETE MY PLAN
const DeleteMyPlan=async(req,res)=>{
    const id=req.params.id;
    try{
        await MYPLAN.findByIdAndDelete({_id:id});
        return res.status(200).json({message:"DELETED"});
    }
    catch(err){
        console.log(err);
    }
}
//RAZORPAY INTEGRATION
// /Order
const orderCheckout=async(req,res)=>{
    const razorpay = new Razorpay({
        key_id:process.env.RAZORPAY_ID_KEY,
        key_secret:process.env.RAZORPAY_SECRET_KEY,
    });
    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount,
        currency:"INR",
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.status(400).send('Not able to create order. Please try again!');
    }
}

//VALIDATE ORDER
const ValidateOrder=async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    // const body=razorpay_order_id+"|"+razorpay_payment_id;
    // const expectedsignature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest('hex');
    // const isauth=expectedsignature===razorpay_signature;
    // if(isauth){
    //     await PaymentMethodChangeEvent.create({
    //         razorpay_order_id,razorpay_payment_id,razorpay_signature
    //     });
    //     res.status(200).json({message:"SUCCESS"})
    // }
    // else{
    //     res.status(400).json({message:"FAILED"});
    // }
}
module.exports={getAllProducts,userRegister,userLogin,orderCheckout,getAllUsers,addToCart,getCartItems,removeCart,ValidateOrder,ItemsPurchased,GetPlans,DeleteMyPlan};
