function normalizeLinkedInData(apifyData, url) {
    if (!apifyData || apifyData.length === 0) {
        return null;
    }

    const profile = apifyData[0];

    const name =
        profile.fullName ||
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

    if (!name) return null;

    const skills = Array.isArray(profile.skills)
        ? profile.skills.map(skill =>
            typeof skill === "string" ? skill : skill.name
        )
        : [];

    const educations = Array.isArray(profile.educations)
        ? profile.educations.map(e => e.schoolName || "")
        : [];

    return {
        name,
        headline: profile.headline || "",
        jobTitle: profile.jobTitle || "",
        companyName: profile.companyName || "",
        location: profile.geoLocationName || "",
        industry: profile.industryName || "",
        followers: profile.followers ?? 0,
        skills,
        educations,
        emails: [],
        phones: [],
        sourceUrl: url,
        scrapedAt: new Date()
    };
}

module.exports = normalizeLinkedInData;
