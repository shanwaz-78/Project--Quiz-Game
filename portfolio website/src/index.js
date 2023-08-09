const connection = require("../database/connection");
const express = require("express");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 8001;
const path = require("path");
const app = express();
app.set("port", port);

// Static path to public directory
const dashBoardPath = path.join(__dirname, "../public");
const loginPagePath = path.join(__dirname, "../public/html/login.html");
const registerPagePath = path.join(__dirname, "../public/html/register.html");
const errPage = path.join(__dirname, "../public/html/404.html");
const update = path.join(__dirname, "../public/html/update.html");
// end static paths

// built-in middleware
app.use(express.static(dashBoardPath));
app.use(express.urlencoded({ extended: false }));

// post data to backend server
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 5);
    await connection.query(
      "INSERT INTO user_info(name, email, password) VALUES(?, ?, ?)",
      [name, email, encryptPassword]
    );
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// user authentication
app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    await connection.query(
      "INSERT INTO login(name, password) VALUES(?, ?)",
      [name, password]
    );
    res.redirect('/')
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// start routes
app.get("/", (req, res) => res.sendFile(dashBoardPath));
app.get("/login", (req, res) => res.sendFile(loginPagePath));
app.get("/register", (req, res) => res.sendFile(registerPagePath));
app.get("/users", (req, res) => res.sendFile(update));
app.get("*", (req, res) => res.sendFile(errPage));
// end routes

// start server
app.listen(port, () => console.log(`server is listening at port ${port}`));
