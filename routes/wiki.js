const express = require("express");
const router = express.Router();

var {Page} = require('../models')
const { User }= require("../models");


router.get("/", (req, res) => {
  Page.findAll().then((pages) => {
    res.render("index",  { pages: [...pages] })
  });
});



router.post('/add', function(req, res, next) {
 User.findOrCreate({
  where: {
    name: req.body.name,
    email: req.body.email
  }
}).then(function (values) {
  var user = values[0];
  var page = Page.create({
    title: req.body.title,
    content: req.body.contenido
  });
  return page.then(function (page) {
    return page.setAuthor(user);
  });
}).catch(next).then((x)=>{
  res.redirect(`/wiki${x.route}`);
}) })



router.get("/add",  (req, res, next)=> {
  res.render('addpage');
});


router.get('/:urlTitle', function (req, res, next) {
        Page.findOne({ where: {  urlTitle: req.params.urlTitle} })
        .then(function(foundPage){
            res.render("wikipage", { foundPage: foundPage })})
        .catch(next)
});
 






module.exports = router;
