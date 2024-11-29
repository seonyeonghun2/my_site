const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require("./routes/mainRouter.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.set('layout', 'layouts/main.ejs');
app.use(expressLayouts);
app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});