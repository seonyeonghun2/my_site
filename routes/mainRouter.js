const express = require("express");
const router = express.Router();
// const commonLayout = require("../views/layouts/common.ejs");

router.get(["/", "/home"], (req, res) => {
  const locals = {
    title: "홈",
    header: "home page",
  };
  res.render("index", {
    locals: locals,
    layout: "layouts/common",
  });
});
// router.get('/signup', (req, res) => {
// // res.send('Hello World!')
// res.render('join');
// });

module.exports = router;
