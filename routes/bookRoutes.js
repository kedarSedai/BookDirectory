const express = require('express');
const Books = require('./book_test');
const router = express.Router();


router.get('/books', (req, res) =>{
    res.send(Books)
})

module.exports = router;