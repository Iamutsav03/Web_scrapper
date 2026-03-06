import { ApifyClient } from "apify-client";

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

export async function runGoogleMapsScraper(query, location, maxResults) {

    const input = {
        searchStringsArray: [query],
        locationQuery: location,
        maxCrawledPlacesPerSearch: maxResults,

        language: "en",
        searchMatching: "all",

        scrapePlaceDetailPage: false,
        scrapeContacts: false,
        scrapeDirectories: false,

        maxReviews: 0,
        maxImages: 0
    };

    const run = await client.actor("nwua9Gu5YrADL7ZDj").call(input);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return items;
}