const mongoose = require("mongoose");

const googleBusinessSchema = new mongoose.Schema({
    name: String,
    category: String,
    phone: String,
    website: String,
    rating: Number,

    placeId: {
        type: String,
        unique: true
    },

    scrapedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("GoogleBusiness", googleBusinessSchema);