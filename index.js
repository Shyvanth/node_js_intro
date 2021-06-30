require("dotenv").config();

const exp=require("express");

const { Mongoose } = require("mongoose");
//imported
//initialsing
const project=exp();
const mongoose=require("mongoose");
const data=require("./database");
project.use(exp.json());

 mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("success"));
//local host server completed
//now for books,authors etc.
//importing

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
        return res.json({error :`${req.params.title}`});
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
 //updating
 //adding new book(post)
 /*route=/book/author and params=isbn,title and so on ,we can write all params,so use new Book obj.
 */
 project.post("/book/add",(req,res)=>{
     const {newBook}=req.body;
     //can also write const newBook=req.body.newBoook,above line is destructuring?
     //we are pushing newBook into data of books object.
     data.books.push(newBook);
     return res.json({ur_books:data.books});
 });
 //upto now ,browser only take get function,to take post ,use postman(http client)
 /*adding author 
 route =add/author
 same as book*/
 project.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
   
    data.author.push(newAuthor);
    return res.json({Authors:data.author});
});
//publications adding
project.post("/pub/add",(req,res)=>{
    const {newPub}=req.body;
    
    data.pub.push(newPub);
    return res.json({thors_after_adding_pub:data.pub});
});
//put
//updating in and of it
//update book title
project.put("/update/book/:isb",(req,res)=>{
    //for each is best than map and filter because it directly access arary
    data.books.forEach((book) => {
        
     
        if(book.isbn===req.params.isb){
            book.title=req.body.newTitle;
            return;
        }

    });
    return res.json(data.books);
});
//these all which are modifying in postman ,are only upddated in RAm
//update /add new author
//here we should in books,author array both
project.put("/update/author/:Isbn/:AuthorId",(req,res)=>{
    data.books.forEach((book)=>{
        if(book.isbn===req.params.Isbn){
            return book.author.push(parseInt(req.params.AuthorId));
        }
        
    });
    data.author.forEach((book)=>{
        if(book.id===parseInt(req.params.AuthorId)){
            return book.author.push(req.params.Isbn);
        }
    });
    return res.json({updated_books:data.books, updated_author:data.author});
});
//update /add new book to pub
project.put("publi/update/book/:Isb",(req,res)=>{
    //updating pub databse
    data.pub.forEach((element)=>{
        if(element.id===req.body.pubId){
            return element.books.push(req.params.Isb);
            //DOUBT

        }
    });
    data.books.forEach((book)=>{
        if(book.isbn===req.params.Isb){
           book.pub=req.body.pubId;
           return;
        }

    });
    return res.json(data.books);

});
//now using delete
//1.delete a book
project.delete("/delete/book/:Isbn",(req,res)=>{
    //use filter as it creates new arr
    const newBooks=data.books.filter((book)=>{
        book.isbn!==req.params.Isbn;
    });
    data.books=newBooks;
    return res.json(data.books);


});



 
 project.listen(420,()=>console.log("lets check"));
