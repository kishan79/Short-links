const express = require("express");
const { getHome, redirectToURL } = require("../controllers/home");
const router = express.Router();

router.route("/").get(getHome);
router.route('/:code').get(redirectToURL);

module.exports = router;
