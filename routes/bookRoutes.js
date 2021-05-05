const express = require('express');
const Books = require('./book_test');
const router = express.Router();


router.get('/books', (req, res) =>{
    res.send(Books)
});

router.get('/books/:id', async (req, res) =>{
    const { id } = req.params;
    const book = await Books.find(b => b.isbn === id);
    if(book){
       return res.send(book)
    }else{
        return res.status(404).send("Book not found");    }
});

module.exports = router;