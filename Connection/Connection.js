const mongoose=require('mongoose');
const ConnectDb=async()=>{
    try{
        await mongoose.connect("mongodb+srv://pandeyshivank21:VUp3QyGie0LvzaGx@cluster1.slqudby.mongodb.net/rhinoreps?retryWrites=true&w=majority&appName=Cluster1");
        console.log("MongoDb Connected");
    }
    catch(err){
        CSSConditionRule.log(err);
    }
}
module.exports=ConnectDb;