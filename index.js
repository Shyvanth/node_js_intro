
//local host server completed
//now for books,authors etc.
//importing

//project along with node js and express
/*1.import the required packages
using require(configuration)
and initialise*/
/*for package .json file,go to cd and type npm init
to install express npm i express in cd*/
//importing or configuring


/* we are using node nameoffile for to work server
instead download npx nodemon*/
require("dotenv").config();

const exp=require("express");

const { Mongoose } = require("mongoose");
//imported
//initialsing
const project=exp();
//
const mongoose=require("mongoose");
const data=require("./database");
//models
const BookModels=require("./mongo_database.js/book");
//
const Authormodels=require("./mongo_database.js/author");
//
const PublModels=require("./mongo_database.js/publ");
const BookModel = require("./mongo_database.js/book");
project.use(exp.json());

 mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("success"));
//route=/
//to get all books

project.get("/",async (req,res)=>{
    const getAllBooks= await BookModels.find();
    return res.json(getAllBooks);

});
/*
route=/sp-book, (using isbn)
para=isbn)*/
project.get("/sp-book/:Isbn",async (req,res)=>{
    const  getSpecificBook=await BookModels.findOne({isbn:req.params.Isbn});

    /*const getSpecificBook=data.books.filter((book)=>
        book.isbn===req.params.Isbn
    );*/
    if(!getSpecificBook){
        return res.json({error:`no book with ${req.params.Isbn}`});
    }
    return res.json({ur_book:getSpecificBook});
});
/* based on category,the books are
route=/cat
para:categ*/
project.get("/cat/:categ",async (req,res)=>{
    const booky =await BookModels.findOne({category:req.params.categ});
    /*const booky=data.books.filter((book)=>
    /*we should not use {}  
        book.category.includes(req.params.categ)
    );*/
    if(!booky){
        return res.json({error:`no book with ${req.params.categ}`});
    }
    return res.json({ur_book:booky});
});
/*based on lang,the books are
route=/lang
param=language
*/
project.get("/lang/:language",async (req,res)=>{
    const BookOfLang=await BookModels.findOne({language:req.params.language});
    
    if(!BookOfLang){
        return res.json({error:`no book with ${req.params.languagess}`});
    }
    return res.json({ur_book:BookOfLang});
});
/*
for all authors */
project.get("/author",async (req,res)=>{
    const getAllAuthors=await Authormodels.find();
    return res.json(getAllAuthors);

});
/*
specific author based on id
route=author
para=id
 */
project.get("/sp/:Id",async (req,res)=>{
    let x=parseInt(req.params.Id);
    const SpecificAuthor=await Authormodels.findOne({id:x});
    /*const SpecificAuthor=data.authors.filter((author)=>
        author.id===parseInt(req.params.Id)
    );//DOUBT (not working);
    */
    if(!SpecificAuthor){
        return res.json({error:`no author with ${req.params.Id}`});
    }
    return res.json({ur_book:SpecificAuthor});
});
/*
to get specific author realted to books
 */
project.get("/author/:books",async (req,res)=>{
    const bookyAuthor=await Authormodels.find({books:req.params.books});
    /*  
    const bookyAuthor=data.authors.filter((book)=>
    we should not use {}  
        book.books.includes(req.params.books)
    ); 
    */
    if(!bookyAuthor){
        return res.json({error:`no book with ${req.params.books}`});
    }
    return res.json({ur_book:bookyAuthor});
});
/* getting pub */


project.get("/pub",async (req,res)=>{
    const getAllPub=await PublModels.find();
    return res.json(getAllPub);

});
/*
getting specific pub with id 
 */
project.get("/pub/:Id",async (req,res)=>{
    const publication=await PublModels.findOne({id:req.params.Id});
    //withot parseInt also coming
    /*
    const publication=data.publication.filter((pub)=>
        pub.id===parseInt(req.params.Id)
    );
    */
    if(!publication){
        return res.json({error:`no pub with ${req.params.Id}`});
    }
    return res.json({ur_book:publication});
});
/*
getting pub which publisshes books.....
route+para should not write like /pub/:books,because it goes above one w.r.t id


*/
project.get("/publ/:books",async (req,res)=>{
    const publication=await PublModels.findOne({books:req.params.books});
    //findOne should write 
    //otherwise it directly returns not goes to if line
    /*
    const publication=data.publication.filter((pub)=>
    pub.books.includes(req.params.books)

    
    );
    */
    if(!publication){
        return res.json({error:`no pub with ${req.params.books}`});
    }
    return res.json({ur_book:publication});
    

});
/*
cocmpleted all get outputs
   now using put,to update/modify our existing data
   post,i.e. adding a new book to send a data */
    //1st one
    //to add a book;
project.post("/book/add",(req,res)=>{//using req.body,because we arent using parameters ,but we can use total body.
    const NewBook=req.body.NewBook;//or can write const {NewBook}=req.body
    //PUSHing these new book object to data of books
   // data.books.push(NewBook);
     BookModels.create(NewBook);
    return res.json({msg:"addedbook"});
});
//we cant get in browser like using get,so use postman and also to read json project.use(express.json());(check in video)
//adding author
project.post("/author/add",(req,res)=>{
    const {NewAuthor}=req.body;
    Authormodels.create(NewAuthor);
    
    //data.authors.push(NewAuthor);
    return res.json({all_authors:"addedauthor"});
});
//adding publ
project.post("/pub/add",(req,res)=>{
    const {NewPub}=req.body;
    PublModels.create(NewPub);
    
    //data.publication.push(NewPub);
    return res.json({all_publication:"publicationadded"});
});
/**
 updating book title
 */
project.put("/book/title/add/:Isbn",(req,res)=>{
    //using isbn ,directly accesing body of book
    //use for each ,because it does not create new array
    data.books.forEach((book)=>{
        if(book.isbn===req.params.Isbn){
            book.title=req.body.newTitle;
            return;
        }
    });
    return res.json(data.books);


});
//update author for a book
//for this we should update in both books and author respectively
project.put("/update/author/:Isbn/:AuthorId",(req,res)=>{
    data.books.forEach((book)=>{
        if(book.isbn===req.params.Isbn){
            return book.authors.push(parseInt(req.params.AuthorId));
        }
        
    });
    data.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.AuthorId)){
            return author.books.push(req.params.Isbn);
        }//do again 
    });
    return res.json({updated_books:data.books, updated_author:data.authors});
});
//updating author name

project.put("/author/update/:Id",(req,res)=>{
   
    data.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.Id)){
            author.name=req.body.NewTitle;
            return;
        }
    });
    return res.json(data.authors);


});
//updating public title
project.put("/pub/update/:Id",(req,res)=>{
    
    data.publication.forEach((pub)=>{
        if(pub.id===parseInt(req.params.Id)){
            pub.name=req.body.NewTitle;
            return;
        }
    });
    return res.json(data.publication);


});
//update or add a new book to publication
project.put("/pub/add/book/:Isbn",(req,res)=>{
    //update books
    data.publication.forEach((pub)=>{
        if(pub.id===req.body.pubId){
            pub.books.push(req.params.Isbn);
            return;
        }
    });
    //update book
    data.books.forEach((book)=>{
        if(book.isbn===req.params.Isbn){
            return book.publication=(req.body.pubId);
            return;

        }
    });
    return res.json({books:data.books,pub:data.publication});

}
);
/*
now delete operator is to delete
*/
project.delete("/book/delete/:Isbn",(req,res)=>{
    const NewBooks=data.books.filter((book)=>{
        book.isbn!==req.params.Isbn;
           
        //filter for new arr
    })
    data.books=NewBooks;
    //change const into let to change in books
    return res.json(data.books);

});
//delete author from  a book
project.delete("/book/author/delete/:Isbn/authorId",(req,res)=>{
    //updating book
    data.books.forEach((book)=>{
        if(book.isbn===req.params.Isbn){
            const NewBook=book.authors.filter((author)=>
                author!==parseInt(req.params.authorId)
            );
            book.authors=NewBook;
            return;

        }

    });
    //updating author
    data.authors.forEach((author)=>{
        if(author.id===req.params.authorId){
            const newAuthor=author.books.filter((book)=>
                book!==req.params.Isbn
            );
            author.books=newAuthor;
            return;
        }
    });
    return res.json({ the_books:data.books,the_authors:data.authors});
});
//to know that it is running
project.listen(420,console.log("let the fun begin "));