const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./src/middlewares/uploadFile");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set static file server
app.use(express.static("src/assets"));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

//parsing data from client
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    name: "data",
    secret: "soulbloodz",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// routing
app.get("/", home);
app.get("/contact", contact);
app.get("/myproject", myproject);
app.post("/delete-blog/:id", deleteBlog);

app.get("/register", formRegister);
app.post("/register", register);
app.get("/login", formLogin);
app.post("/login", login);
app.get("/logout", logout);

app.get("/blog", blog);
app.get("/blog-detail/:id", blogDetail);

app.get("/myproject-detail", addProject);
app.post("/myproject-detail", upload.single("image"), addBlog);

app.get("/updateBlog/:id", updateMyBlog);
app.post("/updateBlog", upload.single("image"), updateBlog);

// Render
function home(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("index", { isLogin, user });
}

function addProject(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("myproject-detail", { isLogin, user });
}

function myproject(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("myproject", { isLogin, user });
}

function contact(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("contact", { isLogin, user });
}

function formLogin(req, res) {
  res.render("login");
}

async function login(req, res) {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email='${email}'`;
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!pro.length) {
    console.error("user not registered!");
    req.flash("danger", "Login failed : email is wrong!");
    return res.redirect("/login");
  }

  bcrypt.compare(password, pro[0].password, (error, result) => {
    if (error) {
      req.flash("danger", "Login failed : internal server error!");
      console.error("Login : Internal Server Error!");
      return res.redirect("/login");
    }

    if (!result) {
      console.error("Password is wrong!");
      req.flash("danger", "Login failed : password is wrong!");
      return res.redirect("/login");
    }

    console.log("Login success!");
    req.flash("success", "Login success!");
    req.session.isLogin = true;
    req.session.user = {
      id: pro[0].id,
      name: pro[0].name,
      email: pro[0].email,
    };

    res.redirect("/");
  });
}

async function logout(req, res) {
  console.log("Logout success!");
  req.flash("success", "Logout success!");
  req.session.isLogout = false;
  req.session.user = {};

  res.redirect("/login");
}

async function register(req, res) {
  const { name, email, password } = req.body;

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  const salt = 10;

  bcrypt.hash(password, salt, async (error, hash) => {
    if (error) {
      console.error("Password failed to be encrypted!");
      req.flash("danger", "Register failed : password failed to be encrypted!");
      return res.redirect("/register");
    }

    console.log("Hash result :", hash);
    const query = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}','${hash}')`;

    await sequelize.query(query, { type: QueryTypes.INSERT });
    req.flash("success", "Register success!");
    res.redirect("/");
  });
}

function formRegister(req, res) {
  res.render("register");
}

async function blog(req, res) {
  const query = `SELECT projects.id, projects.name, projects.description, projects.image, projects.start_date, projects.end_date, projects.technologis,
  users.name AS author, users.email FROM projects INNER JOIN users ON projects.author_id = users.id`;
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });
  // console.log("ini project", pro);

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  console.log("blog", pro);

  res.render("blog", {
    data: pro,
    isLogin,
    user,
  });
}

async function blogDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT projects.id, projects.name , projects.description, projects.image, projects.start_date, projects.end_date, projects.technologis,
  users.name AS author, users.email FROM projects INNER JOIN users ON projects.author_id = users.id WHERE projects.id=${id}`;
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  console.log("blogDetail", pro);

  res.render("blog", { data: pro, isLogin, user });
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
  const { name, description, checkbox, start_date, end_date } = req.body;

  const image = req.file.filename;
  const author_id = req.session.user.id;
  console.log("technolgis:", checkbox);
  // Query Insert
  const query = `INSERT INTO projects(name, start_date, end_date, description, technologis, image, author_id) VALUES ('${name}','${start_date}' , '${end_date}','${description}','{${checkbox}}','${image}','${author_id}')`;

  const pro = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log("Data berhasik di insert", pro);

  res.redirect("/blog");
}

async function updateMyBlog(req, res) {
  const { id } = req.params; // dectraction

  const query = `SELECT * FROM projects WHERE id=${id}`;
  const pro = await sequelize.query(query, { type: QueryTypes.SELECT });
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("update-blog", { data: pro[0], isLogin, user });
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
  } = req.body;

  // let image = "";
  // if (req.file) {
  //   image = req.file.filename;
  // }

  // if (!image) {
  //   const query = `SELECT projects.id, projects.name, projects.description, projects.image, projects.start_date, projects.end_date, projects.technologis,
  // users.name, users.email FROM projects LEFT JOIN users ON projects.author_id = users.id WHERE projects.id=${id}`;
  //   const pro = await sequelize.query(query, { type: QueryTypes.SELECT });
  //   image = pro[0].image;
  // }
  let image = "";
  if (req.file) {
    image = req.file.filename;
  }

  let query;
  // Query Insert
  if (image != "") {
    query = `UPDATE projects SET name='${name}', description='${description}', image='${image}' WHERE id='${id}' `;
  } else {
    query = `UPDATE projects SET name='${name}', description='${description}' WHERE id='${id}' `;
  }
  const pro = await sequelize.query(query, { type: QueryTypes.UPDATE });

  console.log("blog berhasil di update", pro);

  res.redirect("/blog");
}

// Local Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
