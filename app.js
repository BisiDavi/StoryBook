const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo")(session);

dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Morgan dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//handlebars helpers
const { formatDate } = require("./helpers/hbs");

// Handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: { formatDate },
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

// Session
app.use(
  session({
    secret: "Olubisi Dave",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongooseConnection
    })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Servier running in ${process.env.NODE_ENV} mode on on port ${PORT}`
  )
);
