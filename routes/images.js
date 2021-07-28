const express = require("express");
const imgController = require("../controllers/imgController");

const router = express.Router();

router.get("/", imgController);

module.exports = router;