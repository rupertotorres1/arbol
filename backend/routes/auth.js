const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/auth");
const { ensureAuthenticated } = require("../auth/helpers");

router.post("/register", Ctrl.register);
router.post("/login", Ctrl.login);
router.post("/logout", ensureAuthenticated, Ctrl.logout);
router.get("/is-authenticated", Ctrl.isAuthenticated);

module.exports = router;
