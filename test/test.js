
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

// //test the DELETE comment articles route
// describe("DELETE/articles/:title", () => {
//     it("it should DELETE  1 article", (done) => {
//         chai.request(server)
//             .delete("/articles/:title")
//              done();

//             });
//     });
    

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

// //test the update articles  route
// describe("PUT/articles/:title", () => {
//     it("it should PUT  1 comment", (done) => {
//         chai.request(server)
//             .put("/articles/:title")
//              done();

//             });
//     });
    

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
  // 3) Create new blog
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
  //       done();
  //     })
  // })

  it("It should GET all Articles", (done) => {
    chai.request(server)
    .get("/articles")
    .end((err,res)=>{
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
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
//   it("should post comments", (done) => {
//     chai.request(server)
//       .post("/articles/_id")
//       .send({ comments: "helloo", })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(404)
//         expect(res.body).to.be.a("object");
//         expect(res.body.result).to.not.equal(0)
        
//       });
//       done()
// })


})


// // 3) Create new blog
// let articles =
// {
//   img: "title-img",
//   title: "ishimwe eliab",
//   author: "ishimweeli@gmail.com",
//   articleBody: "hello how are you"
// }
//     chai.request(server)
// .post('/articles')
// .set({ "auth-token": token })
// .send(articles)
// .end((err, res) => {
// // Asserts
// expect(res.status).to.be.equal(201);
// expect(res.body).to.be.a('object');
// let savedArticles = res.body;
// expect(savedArticles.img).to.be.equal(articles.img);
//   expect(savedArticles.title).to.be.equal(articles.title);
//   expect(savedArticles.author).to.be.equal(articles.author);
// expect(savedArticles.articleBody).to.be.equal(articles.articleBody);
// // 4) Verify one product in test DB
//     chai.request(server)
//     .get('/articles')
//     .end((err, res) => {
//       console.log(res.body);
//         // Asserts
//        expect(res.status).to.be.equal(200);
//         expect(res.body).to.be.a('object');
//        done();
//                  });
//           });
//   });
// });
//   });
  
// });
// it('should register + login a user, create blog and delete it from DB',function(done){
//   this.timeout(30000);
// // 1) Register new user
// let user = {
// username: "armel",
// email: "munyaarmel61@gmail.com",
// password: "123456"
// }
//     request(server)
// .post('/api/user/register')
// .send(user)
// .end((err, res) => {
// // Asserts
// expect(res.status).to.be.equal(200);
// expect(res.body).to.be.a('object');
// // 2) Login the user
//     request(server)
// .post('/api/user/login')
// .send({
//     "email": "munyaarmel61@gmail.com",
//     "password": "123456"
// })
// .end((err, res) => {
//     // Asserts
//     expect(res.status).to.be.equal(200);
//     let token = res.body.data.token;
//     // 3) Create new product
//    let blogs =
//     {
//         title: "blog title",
//         description: "Test blogs Description",
//         img: 'image title'
//    };
//     request(server)
// .post('/blogs')
// .set({ "auth-token": token })
// .send(blogs)
// .end((err, res) => {
// // Asserts
// expect(res.status).to.be.equal(201);
// expect(res.body).to.be.a('object');
// let savedBlogs = res.body[0];
// expect(savedBlogs.title).to.be.equal(blogs.title);
// expect(savedBlogs.description).to.be.equal(blogs.description);
// expect(savedBlogs.img).to.be.equal(blogs.img);
// // 4) Delete product
//     request(server)
//     .delete('/blogs/' + savedBlogs._id)
//     .set({ "auth-token": token })
//     .end((err, res) => {
//         // Asserts
//         expect(res.status).to.be.equal(200);
//         const actualVal = res.body.message;
//        expect(actualVal).to.be.equal('the blog was successfully deleted');
//         done();
//     });
// });
// });
// });
// });

// });