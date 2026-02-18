function normalizeLinkedInData(apifyData, url) {
    if (!apifyData || apifyData.length === 0) {
        return null;
    }

    const profile = apifyData[0];

    const name =
        profile.fullName ||
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

    if (!name) return null;

    return {
        name,
        emails: [], // LinkedIn public usually has none
        phones: [],
        linkedinData: profile, // store full LinkedIn structured data
        sourceUrl: url,
        scrapedAt: new Date()
    };
}

module.exports = normalizeLinkedInData;
