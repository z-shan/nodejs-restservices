var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'), // reference to our app
    mongoose = require('mongoose'),
    Book = mongoose.model('book'), // get it from mongoose because its already loaded in mongoose
    agent =  request.agent(app); // actually use from supertest to execute http calls

describe('Book Crud Test', function() {
    it('should allow a book to be posted and return a read and _id',function(done) {
        var bookPost = {title: 'my new novel', author: 'me', genre: 'horror'}

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function(err,results) {
                //console.log(err);
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done(); // this test is done .. move on to next test
            });
    });

    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
});