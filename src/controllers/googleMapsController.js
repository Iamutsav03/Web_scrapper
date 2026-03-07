const GoogleBusiness = require("../models/googleBusinessModel");
const runGoogleMapsScraper = require("../services/googleMapsService");
const normalizeGoogleData = require("../utils/normalizeGoogleBusiness");

exports.scrapeGoogleMaps = async (req, res) => {

    try {

        const { query, location, maxResults } = req.body;

        const results = await runGoogleMapsScraper(query, location, maxResults);

        const saved = [];

        for (const place of results) {

            const data = normalizeGoogleData(place);

            if (!data.placeId) continue;

            const exists = await GoogleBusiness.findOne({ placeId: data.placeId });

            if (!exists) {
                const newPlace = await GoogleBusiness.create(data);
                saved.push(newPlace);
            }

        }

        res.json({
            message: "Scraping completed",
            saved: saved.length
        });

    } catch (error) {

    console.error("SCRAPER ERROR:", error);

    res.status(500).json({
        error: "Scraping failed",
        message: error.message
    });

}

};
