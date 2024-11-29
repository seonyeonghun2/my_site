const express = require('express')
const router = express.Router();
const mainLayout = require("../views/layouts/main.ejs");

router.get('/', (req, res) => {
    const locals = {
      title: 'Page Title',      
      header: 'Page Header'
    };
    res.render('index', {layout: mainLayout, locals});
  });
// router.get('/signup', (req, res) => {
// // res.send('Hello World!')
// res.render('join');
// });

  module.exports = router;