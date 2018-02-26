const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http'); 
const sinon = require('sinon'); 
const db = require('../db'); 

chai.use(chaiHttp);

const app = require('../index');



describe('Books Suit', function() {

    describe('should get Allow user to borrow Book', () => {
        let mock;
        var serviceUnderTest;
        
            beforeEach(function() {
                mock = sinon.mock(require('../db')).expects('query')
                 serviceUnderTest =   chai.request(app);        
            });
            afterEach(function() {
                mock.restore();
            });

            it('Returns a 200 response if book not borrowed', (done) => {
                let expectedResponse = { userId: 1, bookId: 2};    
                    mock.yields(null, expectedResponse);    
       
               serviceUnderTest.post('/borrows')
                    
                   .end((error, response) => {
                       expect(response).to.have.status(200);
                       expect(response.body).to.equal(expectedResponse);
                       mock.verify();
                       done();
                   });
           });
        
    });
    
});
    