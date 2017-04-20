var bookController = function(Book) {
    var post = function(req, res) {
            var book = new Book(req.body);

            if(!req.body.title) {
                res.status(400);
                res.send('Title is required');
            } else {
                book.save();
                res.status(201);
                res.send(book);
            }
        };

    var get = function(req, res) {
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
                    var returnbooks = [];
                    books.forEach(function(element, index, array) {
                        var newbook = element.toJSON();
                        newbook.links = {};
                        newbook.links.self = 'htpp://'+req.headers.host+'/api/books/'+newbook._id;
                        returnbooks.push(newbook);
                    });
                    res.json(returnbooks);
                }
            });
        }

    return {
        get : get,
        post : post
    }
}

module.exports = bookController;