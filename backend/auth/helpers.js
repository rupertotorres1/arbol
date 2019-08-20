// Middleware function to ensure user is authenticated before accessing certain routes
const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  ensureAuthenticated
};
