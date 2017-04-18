var express = require('express');

var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookapi');

var book = require('./model/bookmodel');
var app = express();
var port = process.env.PORT || 3000;


var bookRouter = express.Router();

bookRouter.route('/books').get(function(req, res) {
    
    var query = {};
    if(req.query.genre) {
        query.genre = req.query.genre;
    } else if(req.query.author) {
        query.author = req.query.author;
    }
    book.find(query, function(err, books) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(books);
        }
    });
});
app.use('/api', bookRouter);


app.get('/', function(req, res) {
    res.send("Welcome to my api.");
});

app.listen(port, function(){
    console.log("Running on port :" + port);
});
