const mongoose=require("mongoose");//configured
const AuthorSchema=mongoose.Schema({//creating schema
    id:Number,
    name:String,
    books:[String],


});
//model
const Authormodel=mongoose.model("authors",AuthorSchema);
module.exports=Authormodel;
