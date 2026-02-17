## How to Test the API (Using Postman)

The backend is deployed on AWS EC2 and is publicly accessible at: http://16.16.140.168:5000

You can test all the functionality using Postman or any REST client.

1. Check if the Server is Running

Method: GET
URL: http://16.16.140.168:5000/

This endpoint simply confirms that the API is running correctly. If everything is working, it will return a basic success message indicating that the scraper platform is live.

2. Scrape Data from a URL

Method: POST
URL: http://16.16.140.168:5000/api/scrape

Headers: Content-Type: application/json

Body (raw JSON):

{
  "url": "https://www.scrapethissite.com/pages/contact/"
}


This endpoint triggers the scraping process.
It uses Puppeteer to visit the provided public URL and extract structured profile data such as:

Name (if available)

Email addresses

Phone numbers

The extracted data is then stored in MongoDB Atlas.

If a CAPTCHA is detected on the page, the system will return a response indicating that manual intervention is required.

3. Retrieve All Scraped Profiles

Method: GET
URL: http://16.16.140.168:5000/api/profiles

This endpoint returns all previously scraped and stored profiles from the database in JSON format.

4. Export Scraped Data to Excel

Method: GET
URL: http://16.16.140.168:5000/api/export

This endpoint generates and downloads an Excel file (scraped_profiles.xlsx) containing all stored records.
