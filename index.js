const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set static file server
app.use(express.static("src/assets"));

//parsing data from client
app.use(express.urlencoded({ extended: false }));

// routing
app.get("/", home);
app.get("/contact", contact);
app.get("/myproject", myproject);
app.get("/myproject-detail", blog);
app.get("/testimonial", testimonial);

app.post("/myproject-detail", addBlog);

// Render
function home(req, res) {
  res.render("index");
}

function blog(req, res) {
  res.render("myproject-detail");
}

function myproject(req, res) {
  res.render("myproject");
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contact(req, res) {
  res.render("contact");
}

function addBlog(req, res) {
  const {
    title,
    startDate,
    endDate,
    content,
    nodejs,
    nextjs,
    reactjs,
    typescript,
    inputimg,
  } = req.body;
  console.log(title);
  console.log(startDate);
  console.log(endDate);
  console.log(content);
  console.log(nodejs);
  console.log(nextjs);
  console.log(reactjs);
  console.log(typescript);
  console.log(inputimg);
}

// Local Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
