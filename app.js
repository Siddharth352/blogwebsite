//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB",{userNewUrlParser:true});


const postSchema={
  title: String,
  body: String
};

const Post = mongoose.model("Post",postSchema);




const homeStartingContent = "Welcome to the Daily blogs!! here you can express your feelings and make them visible or readable to others. so what are yo waitin for?? let get started...  ";
const contactContent = "hello there!!! ..This is Siddharth singh 2nd Year CSE student in MNIT Jaipur  you can contact me by - ";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  let posts = [];

  Post.find({},function(err,posts){
    res.render("home",{hstcnt: homeStartingContent,post:posts});

  });







});


app.get("/contact",function(req,res){
  res.render("contact",{cntcnt: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){

  const post2 = new Post({
    title:req.body.posttitle,
    body:req.body.postbody
  });
  post2.save();


  res.redirect("/");

});

app.get("/posts/:destination",function(req,res){
  var destination = _.lowerCase(req.params.destination);

  var flag=0;
  let posts = [];

  Post.find({},function(err,posts){
    console.log("pop",posts);
    for(var i=0;i<posts.length;i++){

      if (destination==_.lowerCase(posts[i].title)){
        flag=1;
        res.render("post",{title: posts[i].title, body: posts[i].body});
        break;
      }

    }
    if (flag==0){
      console.log("NOT FOUND");}


  });

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
