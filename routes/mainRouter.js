const express = require('express')
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";

router.get('/', (req, res) => {
  const locals = {
    title: 'My Site',
    header: 'Web Developer\'s 팁과 노하우 '
  }
  res.render('index', {locals, layout: mainLayout});
});
// router.get('/signup', (req, res) => {
// // res.send('Hello World!')
// res.render('join');
// });

  module.exports = router;