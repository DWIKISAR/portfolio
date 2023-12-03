const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

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

async function blog(req, res) {
  const query = "SELECT * FROM projects";
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });
  console.log("ini project", pro);

  res.render("blog", { data: pro });
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM projects WHERE id=${id}`;
  const pro = await sequelize.query(query, { type: QueryTypes.DELETE });

  console.log("berhasil delete blog", pro);
  // data.splice(id, 1);
  res.redirect("/blog");
}

async function addBlog(req, res) {
  const {
    name,
    description,
    // start_date,
    // end_date,
    // nodejs,
    // nextjs,
    // reactjs,
    // typescript,
    // inputimg,
  } = req.body;

  const iamge = "neom.jpg";

  // Query Insert
  const query = `INSERT INTO projects(name, description, image) VALUES ('${name}',' ${description}','${iamge}')`;
  const pro = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log("Data berhasik di insert", pro);

  // const dataBlog = {
  //   name,
  //   start_date,
  //   end_date,
  //   description,
  //   // nodejs,
  //   // nextjs,
  //   // reactjs,
  //   // typescript,
  //   // Image,
  // };
  // data.unshift(dataBlog);
  res.redirect("/blog");
}

async function updateMyBlog(req, res) {
  const { id } = req.params; // dectraction

  // const updateFilter = data[parseInt(id)];
  // updateFilter.id = parseInt(id);
  // console.log("updateFilter :", updateFilter);
  const query = `SELECT * FROM projects WHERE id=${id}`;
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("update-blog", { data: pro[0] });
}
async function updateBlog(req, res) {
  const {
    name,
    description,
    id,
    // start_date,
    // end_date,
    // nodejs,
    // nextjs,
    // reactjs,
    // typescript,
    // image,
  } = req.body;
  // console.log(name);
  // console.log(start_date);
  // console.log(end_date);
  // console.log(description);
  // console.log(nodejs);
  // console.log(nextjs);
  // console.log(reactjs);
  // console.log(typescript);
  // console.log(image);

  // data[parseInt(id)] = {
  //   title,
  //   startDate,
  //   endDate,
  //   content,
  //   nodejs,
  //   nextjs,
  //   reactjs,
  //   typescript,
  //   inputimg,
  // };

  const query = `UPDATE projects SET name='${name}', description='${description}' WHERE id=${id}`;
  const pro = await sequelize.query(query, { type: QueryTypes.UPDATE });

  console.log("blog berhasil di update", pro);

  res.redirect("/blog");
}

async function blogDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM projects WHERE id=${id}`;
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("blog", { data: pro });
}

// Local Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
