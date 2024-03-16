const express = require("express");
// const sequelize here
const { Sequelize, QueryTypes } = require("sequelize");
const connection = require("./src/config/connection.json");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const multer = require("multer");

const app = express();
const port = 5000;
const sequelizeConfig = new Sequelize(connection.development);
const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: multerConfig });

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("src/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false, // https => http
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "malesah",
  })
);

app.get("/", home);
app.get("/blog", blog);
app.get("/blog/:id", blogDetail);
app.get("/add-blog", addBlog);
app.get("/delete-blog/:id", handleDeleteBlog);
app.get("/contact-me", contact);
app.get("/testimonial", Testimonial);
app.get("/register", formRegister);
app.get("/login", formLogin);
app.get("/logout", logout);

app.post("/add-blog", upload.single("image"), handleAddBlog);
app.post("/register", register);
app.post("/login", login);

function home(req, res) {
  res.render("index", {
    isLogin: req.session.isLogin,
    users: req.session.users,
  });
}

async function blog(req, res) {
  try {
    const QueryName = `SELECT p.id, p.title, p.date1, p.date2, p.description, p.reactjs, p.nodejs, p.java, p.javascript, p.image, p."updatedAt", u.name AS author FROM project p LEFT JOIN "users" u ON p.author = u.id ORDER BY id DESC`;

    const blog = await sequelizeConfig.query(QueryName, {
      type: QueryTypes.SELECT,
    });

    const obj = blog.map((data) => {
      return {
        ...data,
        isLogin: req.session.isLogin,
      };
    });

    res.render("blog", { data: obj });
  } catch (error) {
    console.log(error);
  }
}

function contact(req, res) {
  res.render("contact");
}

function Testimonial(req, res) {
  res.render("testimonial");
}

async function blogDetail(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const QueryName = `SELECT * FROM project WHERE id=${id}`;

    const blog = await sequelizeConfig.query(QueryName, {
      type: QueryTypes.SELECT,
    });

    const obj = blog.map((data) => {
      return {
        ...data,
        author: "Ikhsan Taufik",
      };
    });
    console.log(obj);

    res.render("blog-detail", { data: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

function addBlog(req, res) {
  res.render("add-blog");
}

async function handleAddBlog(req, res) {
  try {
    const {
      title,
      date1,
      date2,
      description,
      reactjs,
      nodejs,
      java,
      javascript,
    } = req.body;
    const author = req.session.idusers;
    const image = req.file.filename;
    const QueryName = `INSERT INTO project(title, date1, date2, description, reactjs, nodejs, java, javascript, image, author, "createdAt", "updatedAt")
      VALUES ('${title}','${date1}','${date2}','${description}','${reactjs}','${nodejs}','${java}','${javascript}','${image}', '${author}', NOW(), NOW())`;

    await sequelizeConfig.query(QueryName);

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteBlog(req, res) {
  try {
    const { id } = req.params;
    const QueryName = `DELETE FROM project WHERE id = ${id}`;

    await sequelizeConfig.query(QueryName);

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
}

function formRegister(req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    let { name, email, password } = req.body;

    bcrypt.hash(password, 10, async function (err, dataHash) {
      if (err) {
        res.redirect("/register");
      } else {
        await sequelizeConfig.query(
          `INSERT INTO users(name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${dataHash}', NOW(), NOW())`
        );

        req.flash("succes", "Register succesfuly");
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function formLogin(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const queryName = `SELECT * FROM users WHERE email = '${email}'`;

    const isCheckEmail = await sequelizeConfig.query(queryName, {
      type: QueryTypes.SELECT,
    });

    if (!isCheckEmail.length) {
      req.flash("danger", "Email has not been registered");
      return res.redirect("/login");
    }

    await bcrypt.compare(
      password,
      isCheckEmail[0].password,
      function (err, result) {
        if (!result) {
          req.flash("danger", "Password wrong");
          return res.redirect("/login");
        } else {
          req.session.isLogin = true;
          req.session.users = isCheckEmail[0].name;
          req.session.idUsers = isCheckEmail[0].id;
          req.flash("succes", "login succes");

          return res.redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
    } else {
      res.redirect("/login");
    }
  });
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
