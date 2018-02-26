const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http'); 
const sinon = require('sinon'); 
const db = require('../db'); 

chai.use(chaiHttp);

const app = require('../index');

describe('Books suit', () => {
    let mock;
    var serviceUnderTest;
    
        beforeEach(function() {
            mock = sinon.mock(require('../db')).expects('query')
             serviceUnderTest =   chai.request(app);        
        });
        afterEach(function() {
            mock.restore();
        });
    
    it('Returns a 200 response and returns "Hello, World!" string', (done) => {
         let expectedResponse = "Hello, World!";    
             mock.yields(null, expectedResponse);    

        serviceUnderTest.get('/books')
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.equal(expectedResponse);
                mock.verify();
                done();
            });
    });
    it('Returns a 200 response and returns "Hello, World!" with bookID', (done) => {
        book =  {
            "uuid": "3b8187f4-0a4c-11e8-9be4-847beb22259c",
            "id": 5,
            "isbn": "9781593277574",
            "title": "Understanding ECMAScript 6",
            "subtitle": "The Definitive Guide for JavaScript Developers",
            "author": "Nicholas C. Zakas",
            "published": "2016-09-03T00:00:00.000Z",
            "publisher": "No Starch Press",
            "pages": 352,
            "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
            "website": "https://leanpub.com/understandinges6/read",
            "imgUrl": "https://s3.amazonaws.com/titlepages.leanpub.com/understandinges6/hero?1489281135",
            "created_ON": "2018-02-05T08:11:56.000Z"
        };
        let expectedResponse = "Hello, World!";    
        mock.yields(null, expectedResponse);
        let bookId = "3b8187f4-0a4c-11e8-9be4-847beb22259c";
        // let mock = sinon.mock(require('../db')).expects('query').with(bookId).yields(null, expectedResponse);
        mock.withArgs(sinon.match.any, [bookId]);
        serviceUnderTest.get(`/books/${bookId}`)
            .end((error, response) => {
                
                expect(response).to.have.status(200);
                // expect(response.body).to.
                expect(response.body).to.equal(expectedResponse);
                mock.verify();
                done();
            });
    });
    it('Returns a 404 Error if user with Id not found ', (done) => {
        let bookId = "3b8187f4-0a4c-11e8-9be4-847beb22259c";
        let expectedResponse = `User with id: ${bookId} not found`;    
        mock.yields(null, expectedResponse);
        mock.withArgs(sinon.match.any, [bookId]);
        serviceUnderTest.get(`/books/${bookId}`)
            .end((error, response) => {
                expect(response).to.be.json;
               // expect(response).to.have.param('title');

                expect(response).to.have.status(200);
                expect(response.be.id).to.eql(5);
               // expect(response.body).to.be.deep.equal(expectedResponse);
                console.log('Body',response.body);
                console.log('Json',response.json);
                mock.verify();
                done();
            });
    });

    it('Returns a 500 internal server error ', (done) => {
        mock.yields(new Error("Test error"), null);    
        serviceUnderTest.get('/books')
               .end((error, response) => {
                expect(response).to.have.status(500);
                mock.verify();
                done();
            });
    });
});