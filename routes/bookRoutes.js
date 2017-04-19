var express = require('express');


var routes = function(Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .get(function(req, res) {
            var query = {};
            if(req.query.genre) {
                query.genre = req.query.genre;
            } else if(req.query.author) {
                query.author = req.query.author;
            }

            Book.find(query, function(err, books) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        })
        .post(function(req, res) {
            var book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        });

    bookRouter.route('/:bookid').get(function(req, res) {
        
        var query = {};
        if(req.query.genre) {
            query.genre = req.query.genre;
        } else if(req.query.author) {
            query.author = req.query.author;
        }

        Book.find(req.params.bookid, function(err, book) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    });
};

module.exports = routes;


