const mongoose=require("mongoose");
const BookSchema=mongoose.Schema({
    isbn:String,
    title:String,
    pubDate:String,
    language:[String],
    numP:String,
    authors:[Number],
    category:[String],
    publication:Number,

});
const BookModel=mongoose.model("books",BookSchema);
module.exports=BookModel;