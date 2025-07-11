const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const userRoutes = require("./routes/user");

const app = express();
require("./config/profile")(passport);


// DB Connection
mongoose.connect("mongodb://localhost:27017/pinit", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user; // ✅ ADD THIS LINE
  next();
});

app.use("/users", userRoutes);
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});


// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/pins", require("./routes/pins"));
app.use("/boards", require("./routes/boards"));


const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
