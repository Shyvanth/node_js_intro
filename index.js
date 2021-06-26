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
project.get("/a/:isb",(req,res)=>{
   {const booky=data.books.filter((book)=>
        book.isbn===req.params.isb);
    
    if(booky.length===0){
        return res.json("error");}
    
    return res.json({ur_book:booky});
};
});
project.get("/b/:cate",(req,res)=>{
    const categ_book=data.books.filter((book)=>book.category.includes(req.params.cate));
    if(categ_book.length===0){
        return res.json('error ${req.params.categ}');
    }
    return res.json({ur_book:categ_book});

});
project.get("/c/:cat",(req,res)=>{
    const categ_book=data.books.filter((book)=>book.lang.includes(req.params.cat));
    if(categ_book.length===0){
        return res.json('error ${req.params.cat}');
    }
    return res.json({ur_book:categ_book});

});
project.get("/author",(req,res)=>{return res.json({
    books:data.author,
});
});
project.get("/author/:Id",(req,res)=>{
    {const booky=data.author.filter((book)=>
         book.id==parseInt(req.params.Id));
     
     if(booky.length===0){
         return res.json("error");}
     
     return res.json({ur_book:booky});
 };
 });
 project.get("/author/:id/:title",(req,res)=>{
    const categ_book=data.author.filter((book)=>book.books.includes(req.params.title));
    if(categ_book.length===0){
        return res.json({error :'${req.params.title}'});
    }
    return res.json({ur_book:categ_book});

});
project.get("/pub",(req,res)=>{return res.json({
    books:data.pub,
});
});
project.get("/pub/:bot",(req,res)=>{
    const categ_book=data.pub.filter((book)=>book.books.includes(req.params.bot));
    if(categ_book.length===0){
        return res.json('error ${req.params.bot}');
    }
    return res.json({ur_book:categ_book});

});
project.get("/publ/:Id",(req,res)=>{
    {const booky=data.pub.filter((book)=>
         book.id==parseInt(req.params.Id));
     
     if(booky.length===0){
         return res.json("error");}
     
     return res.json({ur_book:booky});
 };
 });
