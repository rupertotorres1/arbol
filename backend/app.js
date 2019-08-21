const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
const passport = require("passport");
const router = require("./routes");

const app = express();

// CORS
// const whitelist =
//   process.env.NODE_ENV === "development"
//     ? ["http://localhost:3000"]
//     : ["http://arbol-app.herokuapp.com", "https://arbol-app.herokuapp.com"];
// const checkOrigin = (origin, callback) => {
//   if (whitelist.includes(origin)) {
//     callback(null, true);
//   } else {
//     callback(new Error("Not allowed by CORS"));
//   }
// };
const allowedOrigin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://arbol-app.herokuapp.com";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

// Other middleware
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Sessions
const store =
  process.env.NODE_ENV === "production"
    ? new redisStore({ url: process.env.REDIS_URL })
    : null;
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSIONS_SECRET_KEY,
    store,
    saveUninitialized: false,
    resave: false
  })
);

// authentication
require("./auth/config");
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use("/api/v1", router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

module.exports = app;
