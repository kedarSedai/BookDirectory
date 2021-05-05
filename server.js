const express = require('express');
const bodyparser  = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

const port = process.env.PORT || 3000;

//Middleware
// app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json());

//Import route
const bookRoute = require('./routes/bookRoutes');

//Middleware
app.use('/api/v1', bookRoute);

//db connection
mongoose
    .connect(process.env.DB,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('Connected to database!!'))
    .catch(err => console.log(err));

app.use((req, res, next)=>{
    res.status(400).send("Invalid Routes");
});

app.get('/', (req, res) =>{
    res.send("Hello from Server");
});

app.listen(port, () => console.log(`Server is running at ${port}`));