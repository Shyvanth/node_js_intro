//here the company detials for what the user want
//array of books ,with inside objects,cresting one object(1 book)
let books=[{
    isbn:"123",
    title:"jai balayya",
    pub_date:"20-10-1985",
    lang:["telugu","english"],
    num_pa:"100",
    author:[1,2],
    category:["tech","movies","physics boya","logic"],
    public:1,

},];
//authors
const author=[{
    id:1,
    name:"chiru",
    books:["12","123"],

},
{
    id:2,
    name:"nag",
    books:["12","125"],

},];
//publ
const pub=[{
    id:1,
    name:"TimeRangers",
    books:["123"]
},
{
    id:2,
    name:"Ranges",
    books:["1234"]
},

];
//as this is in nodejs,it has security,to gave export from here it
module.exports={books,author,pub};