const express = require('express');
const Books = require('./book_test');
const router = express.Router();

//GET ALL BOOKS
router.get('/books', (req, res) =>{
    res.send(Books)
});

//GET BOOKS BY ID
router.get('/books/:id', async (req, res) =>{
    const { id } = req.params;
    //const { id } = req.query;
    const book = await Books.find(b => b.isbn === id);
    if(book){
       return res.send(book)
    }else{
        return res.status(404).send("Book not found");    }
});

//Adding books
router.post("/books", async(req, res) => {
    try {
    var {title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories} = req.body;

    var bookExist = await Books.find(b => b.isbn === isbn);
    if (bookExist) return res.send("Book already exists");

    var book = {title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories} = req.body;
    Books.push(book);
    res.send(book);
    }catch(err) {
        res.send(err);
    }
});

//EDIT BOOKS BY ID
router.patch('/books/:id', async (req,res) => {
    const { id } = req.params; 
    
    try{
        const updateBook = await Books.updateOne({id: req.params.id}, {$set: {title:req.body.title}});
        res.send(updateBook);
    }catch(err){
        res.send(err);
    }
});

//DELETE BOOKS BY ID
router.delete("/books/:id", async(req, res) =>{
    const { id } = req.params
    try{
        let book = Books.find(b => b.isbn === id);
        if (!book) return res.status(400).send("Book Id not found");

        Books.filter(b => b.isbn !== id)
        res.send("Delete Success ");
    }catch(err){
        res.json({message:err});
    }

    console.log(id);
});

module.exports = router;