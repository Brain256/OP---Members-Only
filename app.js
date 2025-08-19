require('dotenv').config();

const express = require('express'); 
const app = express(); 

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); 

const pool = require('./db/pool.js'); 

const path = require('path'); 

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

const userRouter = require('./routes/userRouter.js'); 

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 3000; 

app.get("/", (req, res) => {
    res.render("home", { user: req.user });
})

app.use("/users", userRouter); 

app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`); 
})

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password); 

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});


