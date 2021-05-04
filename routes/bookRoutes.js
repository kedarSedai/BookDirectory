const express = require('express');
const router = express.Router();

router.get('/books', (req, res) =>{
    res.send("Hello")
})

module.exports = router;