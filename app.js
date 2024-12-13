const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const path = require("path");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv"); // .env 환경설정 파일을 읽어들이는 패키지
dotenv.config(); // .env 설정된 환경변수와 값을 읽음
const connectDB = require("./config/database.js");
const expressLayouts = require("express-ejs-layouts");
const mainRouter = require("./routes/mainRouter.js");
const adminRouter = require("./routes/adminRouter.js");
connectDB(); // DB 연결 실행

app.use(expressLayouts);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('layout', 'layouts/main');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", mainRouter);
app.use("/", adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
