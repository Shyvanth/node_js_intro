const mongoose=require("mongoose");
const BookSchema=mongoose.Schema({
    isbn:String,
    title:String,
    pub_date:String,
    lang:[String],
    num_pa:String,
    author:[Number],
    category:[Number],
    pub:Number,

});
const BookModel=mongoose.model("books",BookSchema);
module.exports=BookModel;