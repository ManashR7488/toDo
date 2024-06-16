const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function (err) {});
  res.redirect("/");
});

app.get("/details/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`,"utf-8", function (err, details) {
    res.render("details", { filename: req.params.filename, details: details });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render('edit', { filename: req.params.filename});
});

app.post('/editFile/:filename', (req, res)=>{
  fs.rename(`./files/${req.params.filename}`,`./files/${req.body.NewFileName}.txt`,function(err) {
    res.redirect(`/details/${req.body.NewFileName}.txt`);
  })
})

app.get("/delete/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, function (err) {
    res.redirect("/");
  });
})

app.listen(port, (req, res) => {
  console.log(`server is running on port port`);
  console.log(`http://localhost:${port}`)
});
