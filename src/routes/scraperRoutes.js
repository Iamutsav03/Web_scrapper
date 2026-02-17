const express = require("express");
const {
    scrapeAndSave,
    getProfiles
} = require("../controllers/scaperController");

const router = express.Router();

router.post("/scrape", scrapeAndSave);
router.get("/profiles", getProfiles);

module.exports = router;
