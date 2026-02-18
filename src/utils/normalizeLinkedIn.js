function normalizeLinkedInData(apifyData, url) {
    if (!apifyData || apifyData.length === 0) {
        return null;
    }

    const profile = apifyData[0];

    const name = profile.fullName ||
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

    if (!name) return null;

    return {
        name,
        emails: profile.emailAddress ? [profile.emailAddress] : [],
        phones: profile.primaryPhone ? [profile.primaryPhone] : [],
        sourceUrl: url,
        scrapedAt: new Date(),
        source: "apify"
    };
}

module.exports = normalizeLinkedInData;
