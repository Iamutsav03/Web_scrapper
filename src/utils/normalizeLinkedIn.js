function normalizeLinkedInData(apifyData, url) {
    if (!apifyData || apifyData.length === 0) {
        return null;
    }

    const profile = apifyData[0];

    const name =
        profile.fullName ||
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

    // If no valid name found, don’t store incomplete record
    if (!name) return null;

    return {
        name,
        emails: profile.emailAddress
            ? [profile.emailAddress]
            : profile.email
                ? [profile.email]
                : [],
        phones: profile.primaryPhone
            ? [profile.primaryPhone]
            : profile.mobileNumber
                ? [profile.mobileNumber]
                : [],
        sourceUrl: url,
        scrapedAt: new Date(),
        source: "apify"
    };
}

module.exports = normalizeLinkedInData;
