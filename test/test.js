
// // import request from 'chai'  
// import should  from 'chai';
// import chai from 'chai';
// import mocha from'mocha';

// // import describe from 'chai'
// // import use from 'chai'
// import chaiHttp from 'chai-http';
// import server from '../app.js';
// // import should from 'should';
// //assertion style

// // should();
// chai.use(chaiHttp);

// //**
// //test the GET all queries route
//     mocha.describe("GET/queries", () => {
//         it ("it should GET all queries", (done) => {
//             chai.request(server)
//                 .get("/queries")
//                  done();

//                 });
//         });
        

// //*

// //**
// //test the POST all queries route
// mocha.describe("POST/queries", () => {
//     it("it should POST  queries", (done) => {
//         chai.request(server)
//             .post("/queries")
//              done();

//             });
//     });
    

// //*

// //**
// //test the POST articles route
// describe("POST/articles", () => {
//     it("it should POST  articles", (done) => {
//         chai.request(server)
//             .post("/articles")
//              done();

//             });
//     });
    

// //*

// //test the GET ALL articles route
// describe("GET/articles", () => {
//     it("it should GET  articles", (done) => {
//         chai.request(server)
//             .get("/articles")
//              done();

//             });
//     });
    

// //*

// //test the GET ALL articles route
// describe("GET/articles/:title", () => {
//     it("it should GET  all articles", (done) => {
//         chai.request(server)
//             .get("/articles/:title")
//              done();

//             });
//     });
    

// //*

// //test the GET ALL articles route
// describe("GET/articles/:title", () => {
//     it("it should GET  all articles", (done) => {
//         chai.request(server)
//             .get("/articles/:title")
//              done();

//             });
//     });
    

// //*

//test the DELETE comment articles route
describe("DELETE/articles/:title", () => {
  it("it should DELETE  1 article", (done) => {
    chai.request(server)
      .delete("/articles/:title")
    done();

  });
});
    

// //*

// //test the DELETE comment articles route
// describe("PUT/likes/:title'", () => {
//     it("it should like  article", (done) => {
//         chai.request(server)
//             .put("/likes/:title'")
//              done();

//             });
//     });
    

// //*

//test the update articles  route
describe("PUT/articles/:title", () => {
  it("it should PUT  1 comment", (done) => {
    chai.request(server)
      .put("/articles/:title")
    done();

    });
});
    

// //*

// //test the PUT comment articles route
// describe("PUT/articles/:_id", () => {
//     it("it should update article", (done) => {
//         chai.request(server)
//             .put("/articles/:_id")
//              done();

//             });
//     });
    

// //*

// //test the PUT comment articles route
// describe("POST/login", () => {
//     it("it should login", (done) => {
//         chai.request(server)
//             .post("/login")
//              done();

//             });
//     });
    

// //*

// //test the PUT comment articles route
// describe("POST/register", () => {
//     it("it should register", (done) => {
//            chai.request(server)
//             .post("/register")
//              done();

//             });
//     });
    


import { expect as _expect, use } from 'chai';
import chai from 'chai';
  const expect = _expect;
import chaiHttp from 'chai-http';
import request from 'request'
import server from '../app.js';
import token from 'jsonwebtoken';
  use(chaiHttp);
describe('User workflow tests', () => {
  it('should register ', function (done) {
    this.timeout(30000);
    // 1) Register new user
    let user = {
    
      first_name: "ishimwe ",
      last_name: "eliab ",
      email: "ishimweeliabbb@gmail",
      password: "12345678"
    
    }
    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        done();
      })
  })


  // 2) Login the user
  it('should login', function (done) {
    this.timeout(30000);
    let login = {
    
      email: "ishimweeliabbb@gmail",
      password: "12345678"

    }
    chai.request(server)
      .post('/login')
      .send(login)
      .end((err, res) => {
        // Asserts
        expect(res.body).to.be.a('object');
        expect(res.status).to.be.equal(200);
        let token = res.body.token;
        done();
      })
  })
  // // 3) Create new blog
  let articles =
  {
    img: "title-img",
    title: "ishimwe eliab",
    author: "ishimweeli@gmail.com",
    articleBody: "hello how are you"
  }

  // it('should create articles', function (done) {
  //   this.timeout(30000);
  //   chai.request(server)
  //     .post('/articles')
  //     .set({ "auth-token": token })
  //     .send(articles)
  //     .end((err, res) => {
  //       // Asserts
  //       expect(res.status).to.be.equal(201);
  //       expect(res.body).to.be.a('object');
  //       let savedArticles = res.body;
  //       expect(savedArticles.img).to.be.equal(articles.img);
  //       expect(savedArticles.title).to.be.equal(articles.title);
  //       expect(savedArticles.author).to.be.equal(articles.author);
  //       expect(savedArticles.articleBody).to.be.equal(articles.articleBody);

  //     })
  //   done();
  // })

  it("It should GET all Articles", (done) => {
    chai.request(server)
    .get("/articles")
    .end((err,res)=>{
        expect(res.status).to.be.equal(200);
      expect(res.body).to.be.a('object');
        expect(res.body.length).not.to.equal(0)
        done();
    })
    done();
  })
  
  it("It should get article by articlesId",(done) =>{
    chai.request(server)
    .get("/articles/:articlesId")
    .end((req,res)=>{
        expect(res.status).to.be.equal(200);
         expect(res.body).to.be.a("object");
        
    });
    done();
  })
  it("should post comment", (done) => {
    chai.request(server)
      .post("/articles/:articlesId")
      .send({ comments: "helloo", })
      .end((err, res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a("object");
        expect(res.body.result).to.not.equal(0)

      });
    done()
  })
  it("should post like", (done) => {
    chai.request(server)
      .post("/articles/:articlesId")
      .send({ likes: "helloo", })
      .end((err, res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a("object");
        expect(res.body.result).to.not.equal(0)

      });
    done()
  })
  it("it should delete article ", (done) => {
    chai.request(server)
      .delete("articles/:articlesId")
      .end((req, res) => {
        done()
      })
  })

  it('should create queries', function (done) {
    this.timeout(30000);
    chai.request(server)
      .post('/queries')

      .send({
        name: "ishimwe eliab",
        email: "ishimwekkkkeli@gmail.com",
        message: "hello how are younn"
      }
      )
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');

      })
    done();
  })

  it("It should GET all queries", (done) => {
    chai.request(server)
      .get("/queries")
      .set({ "auth-token": token })


    done();
  })



})

