const exp=require("express");
//imported
//initialsing
const project=exp();
project.listen(420,()=>console.log("lets check"));
//local host server completed
//now for books,authors etc.
//importing
const data=require("./database");
//getting each
project.get("/",(req,res)=>{return res.json({
    books:data.books,
});
});
project.get("/:isb",(req,res)=>{
   {const booky=data.books.filter((book)=>
        book.isbn===req.params.isb);
    
    if(booky.length===0){
        return res.json("error");}
    
    return res.json({ur_book:booky});
};
});