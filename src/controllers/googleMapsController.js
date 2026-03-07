const GoogleBusiness = require("../models/googleBusinessModel");
const runGoogleMapsScraper = require("../services/googleMapsService");
const normalizeGoogleData = require("../utils/normalizeGoogleBusiness");

console.log("runGoogleMapsScraper:", runGoogleMapsScraper);
console.log("runGoogleMapsScraper type:", typeof runGoogleMapsScraper);

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
        console.error(error);
        res.status(500).json({ error: "Scraping failed" });
    }

};