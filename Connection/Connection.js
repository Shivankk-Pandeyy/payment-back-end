const mongoose=require('mongoose');
const dotenv=require('dotenv').config()
const mongoPassword=process.env.MONGO_PASSWORD;
const ConnectDb=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://pandeyshivank21:${mongoPassword}@cluster1.slqudby.mongodb.net/rhinoreps?retryWrites=true&w=majority&appName=Cluster1`);
        console.log("MongoDb Connected");
    }
    catch(err){
        CSSConditionRule.log(err);
    }
}
module.exports=ConnectDb;
