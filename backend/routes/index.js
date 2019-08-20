const express = require("express");
const router = express.Router();
const todosRouter = require("./todos");
const authRouter = require("./auth");
const { ensureAuthenticated } = require("../auth/helpers");

router.use("/todos", ensureAuthenticated, todosRouter);
router.use("/auth", authRouter);

module.exports = router;
