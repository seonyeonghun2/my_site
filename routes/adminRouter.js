const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET; // secretOrPrivate Key
const cookieParser = require("cookie-parser");
const adminLayout = "../views/layouts/admin.ejs"; // 누구나 볼 수 있는 레이아웃
const mainLayout = "../views/layouts/main.ejs"; // 누구나 볼 수 있는 레이아웃
const User = require("../models/User.js"); // node v18 이상은 확장자를 생략할수 없음.
const Post = require("../models/Post.js");
/**
 * 관리자 로그인 폼
 * GET /admin
 */
router.get("/admin", (req, res) => {
  const locals = {
    title: "My Site [Admin]",
    header: "관리자 로그인",
  };
  res.render("admin/index", { locals, layout: mainLayout });
});
/**
 * 관리자 로그인 요청
 * POST /admin
 */
router.post("/admin", async (req, res) => {
  try {
    const { user_id, user_pwd } = req.body;
    
    const user = await User.find({ user_id });
    
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 사용자입니다"});
    }

    const isValid = bcrypt.compare(user_pwd, user[0].user_pwd);

    if (!isValid) {
      return res.status(401).json({ message: "아이디, 비밀번호를 다시 확인하세요"});
    }

    const token = jwt.sign({ id: user.user_id }, jwtSecret); // 관리자 토큰 (이름,로그인날짜,시간제한,..각종 정보)
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/allPosts");
   
  } catch (error) {
    console.log(error);
  }

});

/**
 * 관리자 전용 화면 : 작성한 전체 게시물 목록 화면 [수정,삭제,추가,목록...] + 로그아웃 [버튼]
 * GET /allPosts
*/

const 토큰체크MW = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect('/admin'); // 토큰 값 없으면, 관리자 로그인 폼으로 리다이렉트
  }
  next();
}

router.get("/allPosts", 토큰체크MW, async (req, res) => {
  // 토큰 체크 : 관리자 유무 확인

  const data = await Post.find().sort({createdAt: -1});    
  const len = data.length; // 글의 갯수
  res.render("admin/allPosts", { data, len, layout: adminLayout });
})

/**
 * 회원 가입 폼 보기
 * GET /register
 */
router.get("/register", (req, res) => {
  const locals = {
    title: "Register Memeber",
    header: "회원가입",
  };
  res.render("register", {layout: mainLayout, locals})
});

/**
 * 관리자 회원 가입요청
 * POST /register
 */
router.post("/register", async (req, res) => {
  try {
    const { user_id, user_nick, user_pwd, user_email } = req.body;

    const hashedPwd = await bcrypt.hash(user_pwd, 10);

    const user = new User({
      user_id: user_id,
      user_pwd: hashedPwd,
      user_nick: user_nick,
      user_email: user_email,
    });

    const savedUser = await user.save();

    if (!savedUser) {
      throw new Error("계정 생성 실패!");
    }

    res.status(200).send({
      message: "user account is created",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});
/**
 * 회원 정보 찾기
 * POST /find
 */
router.post("/find", (req, res) => {
  res.send("이름 또는 이메일정보로 회원 ID/PW 찾기");
});

/**
 * 관리자 글쓰기 - Admin Post
 * GET /add
 */
router.get('/add', (req, res) => {
  const locals = {
    title: '글쓰기'
  }
  res.render("admin/add", {locals, layout: adminLayout})
})

/**
 * 관리자 글쓰기 - Admin Post
 * POST /add
 * DB에 Post 데이터 등록 : Post 모델이 필요.
 */
router.post('/add', async (req, res) => {
  const {title, content} = req.body;
  const newPost = new Post({
    title,
    content
  });
  await newPost.save();
  res.redirect('/allPosts');  
})

/**
 * Admin - Edit Post
 * GET /edit/:id or /modify/:id
 * 특정 게시물에 대한 제목/내용 수정 
 */
router.get("/edit/:id", async (req, res) => {
  const locals = {
    title: '게시글 편집'
  }
  const real_id = await Post.findOne({uuid: req.params.id})
  const data = await Post.findById(real_id);
  console.log(data);
  res.render("admin/edit", {locals, data, layout:adminLayout})
});

/**
 * Admin - Put Post
 * PUT /edit/:id or /modify/:id
 * 특정 게시물에 대한 제목/내용 업데이트
 */
router.put("/edit/:id", async (req, res) => {
  const {title, content} = req.body;
  const real_id = await Post.findOne({uuid: req.params.id})
  const data = await Post.findByIdAndUpdate(real_id, {title, content})
  res.redirect("/allPosts");  
})

/** 
 * Admin - Delete Post
 * DELETE /delete/:id <-- form의 POST 요청을 DELETE로 바꾸어 요청할때
 * 특정 게시물에 대한 삭제 요청
 */
router.get("/remove/:id", async (req, res) => {
  const real_id = await Post.findOne({uuid: req.params.id})
  const data = await Post.findByIdAndDelete(real_id);
  res.redirect("/allPosts");
})

/**
 * 관리자 로그아웃
 * GET /lgout
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
})
module.exports = router;
