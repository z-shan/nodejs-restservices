var bookController = function(Book) {
    var post = function(req, res) {
            var book = new Book(req.body);
            book.save();
            res.status(201).send(book);
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
                    res.json(books);
                }
            });
        }

    return {
        get : get,
        post : post
    }
}

module.exports = bookController;