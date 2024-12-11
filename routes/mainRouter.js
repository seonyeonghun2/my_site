const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require('../models/Post.js'); // Post 생성, 조회, 삭제, 수정 --> mongoose 제어
/**
 * 첫 페이지 : index router
 * GET / or /home
 */
router.get(['/','/home'], async (req, res) => {
  const locals = {
    title: 'My Site',
    header: 'Web Developer\'s 팁과 노하우 '
  }
  // DB에 저장된 글(Post, Blog, News,..)을 모두 또는 일부만 읽어와서,
  const data = await Post.find();
  // 템플릿 문서(index)에 전달해서, 화면에 표시!
  // 특정 분야의 게시글, 최신글, 글목록...
  res.render('index', {locals, data, layout: mainLayout});
});

/**
 * 최신글 보기
 * GET /post/:id
 * 라우트 파라미터(=매개변수) | 끝에 작성
 */
router.get('/posts/:id', async (req, res) => {
  const locals = {
    title: 'My Site',
    header: '사이트 소개'
  }
  
  const data = await Post.findById(req.params.id)
  
  res.render("post", {data, locals, layout:mainLayout})
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

// 임시로 등록하는 POST, mainRouter.js가 로딩되면 실행되므로 ==> 서버 재실행 하지  않도록 주의
// 1) 서버 중단
// 2) 아래 코드와 내용 작성
// 3) 서버 실행
// 4) 아래 코드를 주석처리 : 서버가 재실행되면 3개씩, 같은 데이터가 DB에 계속 저장됨.
// Post.insertMany([
//   {
//     title: "언론 출판의 자유에 대해서...",
//     content: "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는 이에 대한 피해의 배상을 청구할 수 있다."
//   },
//   {
//     title: "국회의 의무란?",
//     content: "국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회는 국가의 예산안을 심의·확정한다. 국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며, 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다."
//   },
//   {
//     title: "군사법원 조직 및 관할에 대해서...",
//     content: "군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지 아니하고는 체포 또는 구속을 당하지 아니한다. 체포 또는 구속을 당한 자의 가족등 법률이 정하는 자에게는 그 이유와 일시·장소가 지체없이 통지되어야 한다."
//   },
// ])