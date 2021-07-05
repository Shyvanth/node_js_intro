const mongoose=require("mongoose");//configured
const PublSchema=mongoose.Schema({//creating schema
    id:Number,
    name:String,
    books:[String],


});
//model
const PubModel=mongoose.model("publication",PublSchema);
module.exports=PubModel;