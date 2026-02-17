const express = require("express");
const {
    scrapeAndSave,
    getProfiles
} = require("../controllers/scaperController");
const { exportProfiles } = require('../controllers/exportController');

const router = express.Router();

router.post("/scrape", scrapeAndSave);
router.get("/profiles", getProfiles);
router.get('/export', exportProfiles);

module.exports = router;
