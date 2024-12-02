const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";

/**
 * 첫 페이지 : index router
 * GET / or /home
 */
router.get('/', (req, res) => {
  const locals = {
    title: 'My Site',
    header: 'Web Developer\'s 팁과 노하우 '
  }
  res.render('index', {locals, layout: mainLayout});
});

/**
 * About : 사이트 소개
 * GET /about
 */
router.get('/about', (req, res) => {
  const locals = {
    title: 'My Site',
    header: '사이트 소개'
  }
  res.render('about', {locals, layout: mainLayout});
});

/**
 * Contact : 작업 요청, 의뢰
 * GET /contact
 */
router.get('/contact', (req, res) => {
  const locals = {
    title: 'My Site',
    header: '작업요청 및 상담'
  }
  res.render('contact', {locals, layout: mainLayout});
});

module.exports = router;
