const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        headline: {
            type: String,
            default: ""
        },
        jobTitle: {
            type: String,
            default: ""
        },
        companyName: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        industry: {
            type: String,
            default: ""
        },
        followers: {
            type: Number,
            default: 0
        },
        skills: [{
            type: String
        }],
        educations: [{
            type: String
        }],
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
