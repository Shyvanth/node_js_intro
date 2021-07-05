let books=[{
    isbn:"123",
    title:"indian stars",
    pubDate:"20-20-2020",
    language:["english"],
    numP:200,
    authors:[1,2],
    category:["acting","disciple","direction"],
    publication:1,

},];
const authors=[{
    id:1,
    name:"chiru",
    books:["123","12345"],
},
{
    id:2,
    name:"nag",
    books:["123","1235"],
},
];
const publication=[{
    id:1,
    name:"indian ranges",
    books:["123","12345"],
},];
//created by company
//now to ecport to another files
module.exports={books,authors,publication};

