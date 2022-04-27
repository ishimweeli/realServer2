
// import request from 'chai'  
import should  from 'chai';
import chai from 'chai';
import mocha from'mocha';

// import describe from 'chai'
// import use from 'chai'
import chaiHttp from 'chai-http';
import server from '../app.js';
// import should from 'should';
//assertion style

// should();
chai.use(chaiHttp);

//** 
//test the GET all queries route
    mocha.describe("GET/queries", () => {
        it ("it should GET all queries", (done) => {
            chai.request(server)
                .get("/queries")
                 done();

                });
        });
        

//*

//** 
//test the POST all queries route
mocha.describe("POST/queries", () => {
    it("it should POST  queries", (done) => {
        chai.request(server)
            .post("/queries")
             done();

            });
    });
    

//*

//** 
//test the POST articles route
describe("POST/articles", () => {
    it("it should POST  articles", (done) => {
        chai.request(server)
            .post("/articles")
             done();

            });
    });
    

//*

//test the GET ALL articles route
describe("GET/articles", () => {
    it("it should GET  articles", (done) => {
        chai.request(server)
            .get("/articles")
             done();

            });
    });
    

//*

//test the GET ALL articles route
describe("GET/articles/:title", () => {
    it("it should GET  all articles", (done) => {
        chai.request(server)
            .get("/articles/:title")
             done();

            });
    });
    

//*

//test the GET ALL articles route
describe("GET/articles/:title", () => {
    it("it should GET  all articles", (done) => {
        chai.request(server)
            .get("/articles/:title")
             done();

            });
    });
    

//*

//test the DELETE comment articles route
describe("DELETE/articles/:title", () => {
    it("it should DELETE  1 article", (done) => {
        chai.request(server)
            .delete("/articles/:title")
             done();

            });
    });
    

//*

//test the DELETE comment articles route
describe("PUT/likes/:title'", () => {
    it("it should like  article", (done) => {
        chai.request(server)
            .put("/likes/:title'")
             done();

            });
    });
    

//*

//test the update articles  route
describe("PUT/articles/:title", () => {
    it("it should PUT  1 comment", (done) => {
        chai.request(server)
            .put("/articles/:title")
             done();

            });
    });
    

//*

//test the PUT comment articles route
describe("PUT/articles/:_id", () => {
    it("it should update article", (done) => {
        chai.request(server)
            .put("/articles/:_id")
             done();

            });
    });
    

//*

//test the PUT comment articles route
describe("POST/login", () => {
    it("it should login", (done) => {
        chai.request(server)
            .post("/login")
             done();

            });
    });
    

//*

//test the PUT comment articles route
describe("POST/register", () => {
    it("it should register", (done) => {
           chai.request(server)
            .post("/register")
             done();

            });
    });
    

//*

