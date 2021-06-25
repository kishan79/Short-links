const express = require("express");
const { genrateShortUrl, getShortUrl } = require("../controllers/link");
const router = express.Router();

router.route("/").post(genrateShortUrl);
router.route("/:code").get(getShortUrl);

module.exports = router;
