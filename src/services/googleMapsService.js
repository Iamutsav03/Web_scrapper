const { ApifyClient } = require("apify-client");

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

async function runGoogleMapsScraper(query, location, maxResults) {

    const input = {
        searchStringsArray: [query],
        locationQuery: location,
        maxCrawledPlacesPerSearch: maxResults,

        language: "en",
        searchMatching: "all",

        scrapePlaceDetailPage: true,
        scrapeContacts: false,
        scrapeDirectories: false,

        maxReviews: 0,
        maxImages: 0
    };

    const run = await client.actor("nwua9Gu5YrADL7ZDj").call(input);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return items;
}

module.exports = runGoogleMapsScraper;