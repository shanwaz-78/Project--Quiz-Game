const conn = require("./database/connection");
const express = require("express"); 
const bcrypt = require("bcrypt");
const port = process.env.PORT || 8001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed_passwd = await bcrypt.hash(password, 4);
    await conn.query(
      "INSERT INTO user_info(name, email, password) VALUES(?, ?, ?)",
      [name, email, hashed_passwd]
    );
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});

// start routes.
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/login", (req, res) => res.render("login.ejs"));
app.get("/register", (req, res) => res.render("register.ejs"));
// end routes.

// start server.
app.listen(port, () =>
  console.log(`Server is listening at port localhost:${port}`)
);
