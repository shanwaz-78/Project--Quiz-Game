const connection = require("../database/connection");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8001;
const path = require("path");
const app = express();
app.set("port", port);

// Static path to public directory
const dashBoardPath = path.join(__dirname, "../public");
const loginPagePath = path.join(__dirname, "../public/html/login.html");
const registerPagePath = path.join(__dirname, "../public/html/register.html");
const errPage = path.join(__dirname, "../public/html/404.html");
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
    const rows = await connection.query(
      "SELECT * FROM user_info WHERE name = ?",
      name
    );
    if (rows.length === 0) {
      return res.redirect("/register");
    }

    const hashedPassword = rows[0].password;
    // Compare the provided password with the encrypted password
    const match = await bcrypt.compare(password, hashedPassword);

    if (match) {
      return res.redirect("/");
    } else {
      return res.redirect("/register");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

async function generateToken() {
  const token = await jwt.sign(
    { id: 204939223049492 },
    "kkkaslleleljgjalml2l3lsdkkeopaldalc"
  );
  console.log(token);
  const userVerify = await jwt.verify(
    token,
    "kkkaslleleljgjalml2l3lsdkkeopaldalc"
  );
  console.log(userVerify);
}
generateToken();

// start routes
app.get("/", (req, res) => res.sendFile(dashBoardPath));
app.get("/login", (req, res) => res.sendFile(loginPagePath));
app.get("/register", (req, res) => res.sendFile(registerPagePath));
app.get("*", (req, res) => res.sendFile(errPage));
// end routes

// start server
app.listen(port, () => console.log(`server is listening at port ${port}`));