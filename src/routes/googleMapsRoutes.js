const express = require("express");
const router = express.Router();

const { scrapeGoogleMaps, getGoogleBusinesses, exportGoogleBusinesses } = require("../controllers/googleMapsController");

router.post("/scrape-google-maps", scrapeGoogleMaps);
router.get("/google-businesses", getGoogleBusinesses);
router.get("/export-google-sheet", exportGoogleBusinesses);

module.exports = router;
