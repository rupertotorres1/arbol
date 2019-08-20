const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models").User;

const register = async (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  await User.create({ username, password: hash });

  passport.authenticate("local", function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);
    req.login(user, (err) => (err ? next(err) : res.sendStatus(200)));
  })(req, res, next);
};

const login = async (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);
    req.login(user, (err) => (err ? next(err) : res.sendStatus(200)));
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout();
  res.sendStatus(200);
};

const isAuthenticated = async (req, res) => {
  res.status(200).send({ isLoggedIn: req.isAuthenticated() });
};

module.exports = {
  register,
  login,
  logout,
  isAuthenticated
};
