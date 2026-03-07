const { google } = require("googleapis");

async function exportToGoogleSheets(data) {

    const auth = new google.auth.GoogleAuth({
        keyFile: "./credentials.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // clear sheet first
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: "Sheet1!A:E"
    });

    const values = [
        ["Name", "Category", "Phone", "Website", "Rating"],
        ...data.map(item => [
            item.name,
            item.category,
            item.phone,
            item.website,
            item.rating
        ])
    ];

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        requestBody: {
            values
        }
    });
}

module.exports = exportToGoogleSheets;