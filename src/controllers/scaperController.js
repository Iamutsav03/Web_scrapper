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
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function getProfiles(req, res) {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: profiles.length,
            data: profiles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    scrapeAndSave,
    getProfiles
};
