const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const cors=require('cors');
const PORT=process.env.PORT;
const products_routes=require('./Routes/Products');
const admin_routes=require("./Routes/Admin_Route");
//MIDDLEWARE
app.use(express.json());
app.use(cors(
    {
        origin:["https://payment-front-end.vercel.app"],
        methods:["POST","GET"],
        credentials:true,
    }
));
//FOR PDF FILES MADE STATIC
app.use("/files",express.static("files"));
//MIDDLEWARE FOR ROUTER
app.use("/api/rhinoreps",products_routes);
//ADMIN PANEL ROUTE
app.use("/api/AdminRhinoReps",admin_routes)
//MONGO DB SERVER 
const Connection=require('./Connection/Connection');
Connection();
//SERVER STARTED
app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})
