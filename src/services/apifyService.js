const { ApifyClient } = require("apify-client");

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

async function scrapeLinkedInWithApify(profileUrl) {
    try {
        const input = {
            urls: [
                { url: profileUrl }
            ],
            findContacts: false
        };

        // Run actor and wait until finished
        const run = await client
            .actor("yZnhB5JewWf9xSmoM")
            .call(input);

        // Get dataset results
        const { items } = await client
            .dataset(run.defaultDatasetId)
            .listItems();

        return items;

    } catch (error) {
        console.error("Apify scraping failed:", error.message);
        throw error;
    }
}

module.exports = scrapeLinkedInWithApify;
