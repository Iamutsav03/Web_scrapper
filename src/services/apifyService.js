const { ApifyClient } = require("apify-client");

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

async function scrapeLinkedInWithApify(profileUrl) {
    try {
        // Run actor and wait for completion
        const run = await client.actor("2SyF0bVxmgGr8IVCZ").call({
            profileUrls: [profileUrl],
        });

        // Get results from dataset
        const { items } = await client
            .dataset(run.defaultDatasetId)
            .listItems();

        return items;

    } catch (error) {
        console.error("Apify error:", error.message);
        throw error;
    }
}

module.exports = scrapeLinkedInWithApify;
