const scrapeProfile = require("../services/scraperServices");
const Profile = require("../models/profile");
const validator = require("validator");

async function scrapeAndSave(req, res) {
    try {
        const { url } = req.body;

        if (!url || !validator.isURL(url)) {
            return res.status(400).json({
                success: false,
                message: "Valid URL is required"
            });
        }

        const scrapedData = await scrapeProfile(url);

        if (scrapedData.success === false) {
            return res.status(200).json(scrapedData);
        }

        const savedProfile = await Profile.findOneAndUpdate(
            { sourceUrl: scrapedData.sourceUrl },
            scrapedData,
            { new: true, upsert: true }
        );

        return res.status(201).json({
            success: true,
            data: savedProfile
        });

    } catch (error) {
        console.error("Controller error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

async function getProfiles(req, res) {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });

        return res.status(200).json({
            count: profiles.length,
            data: profiles
        });

    } catch (error) {
        console.error("Fetch error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    scrapeAndSave,
    getProfiles
};
