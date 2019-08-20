const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/todos");

router.get("/", Ctrl.findAll);
router.post("/", Ctrl.create);
router.put("/:id", Ctrl.update);
router.delete("/:id", Ctrl.destroy);

module.exports = router;
