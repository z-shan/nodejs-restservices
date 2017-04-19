var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookapi');

var Book = require('./model/bookmodel');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send("Welcome to my api.");
});

app.listen(port, function(){
    console.log("Running on port :" + port);
});
