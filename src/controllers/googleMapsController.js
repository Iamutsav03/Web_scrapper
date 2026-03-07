const GoogleBusiness = require("../models/googleBusinessModel");
const runGoogleMapsScraper = require("../services/googleMapsService");
const normalizeGoogleData = require("../utils/normalizeGoogleBusiness");
const exportToGoogleSheets = require("../services/googleSheetsExporter");

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

exports.getGoogleBusinesses = async (req, res) => {
    try {

        const businesses = await GoogleBusiness.find().limit(100);

        res.json({
            total: businesses.length,
            data: businesses
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to fetch businesses"
        });

    }
};

exports.exportGoogleBusinesses = async (req, res) => {

    try {

        const businesses = await GoogleBusiness.find();

        if (businesses.length === 0) {
            return res.json({
                message: "No data to export"
            });
        }

        await exportToGoogleSheets(businesses);

        res.json({
            message: "Exported successfully",
            total: businesses.length
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Export failed"
        });

    }

};
