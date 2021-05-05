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

router.post("/books", async (req, res) => {
    var {title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories} = req.body;

    var bookExist = Books.find(b => b.isbn === isbn);
    if (bookExist) return res.send("Book already exists");

    var book = {title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories} = req.body;
    Books.push(book);
    res.send(book);
});

module.exports = router;