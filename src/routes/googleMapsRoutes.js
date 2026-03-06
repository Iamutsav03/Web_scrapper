const express = require("express");
const router = express.Router();

const { scrapeGoogleMaps } = require("../controllers/googleMapsController");

router.post("/scrape_google_maps", scrapeGoogleMaps);

module.exports = router;