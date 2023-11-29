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
app.post("/delete-blog/:id", deleteBlog);

app.get("/blog", blog);
app.get("/blog-detail/:id", blogDetail);

app.get("/myproject-detail", addProject);
app.post("/myproject-detail", addBlog);

app.get("/updateBlog/:id", updateMyBlog);
app.post("/updateBlog", updateBlog);

const data = [];

// Render
function home(req, res) {
  res.render("index");
}

function addProject(req, res) {
  res.render("myproject-detail");
}

function myproject(req, res) {
  res.render("myproject");
}

function contact(req, res) {
  res.render("contact");
}

function blog(req, res) {
  res.render("blog", { data });
}

function deleteBlog(req, res) {
  const { id } = req.params;

  data.splice(id, 1);
  res.redirect("/blog");
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

  const dataBlog = {
    title,
    startDate,
    endDate,
    content,
    nodejs,
    nextjs,
    reactjs,
    typescript,
    inputimg,
  };

  data.unshift(dataBlog);
  res.redirect("/blog");
}

function updateMyBlog(req, res) {
  const { id } = req.params; // dectraction

  const updateFilter = data[parseInt(id)];
  updateFilter.id = parseInt(id);
  console.log("updateFilter :", updateFilter);
  res.render("update-blog", { data: updateFilter });
}
function updateBlog(req, res) {
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
    id,
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

  data[parseInt(id)] = {
    title,
    startDate,
    endDate,
    content,
    nodejs,
    nextjs,
    reactjs,
    typescript,
    inputimg,
  };

  res.redirect("/blog");
}

function blogDetail(req, res) {
  const { id } = req.params;

  const title = "Title 1";
  const content = "Content 1";

  const data = {
    id,
    title,
    content,
  };

  res.render("blog", { data });
}

// Local Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
