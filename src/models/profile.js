const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        emails: [{
            type: String,
            match: [/^\S+@\S+\.\S+$/, "Invalid email"]
        }],
        phones: [{
            type: String
        }],
        sourceUrl: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        scrapedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Profile", profileSchema);
