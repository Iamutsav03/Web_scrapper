const express = require("express");
const cors = require("cors");
const scraperRoutes = require("./routes/scraperRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", scraperRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Web Scraper Platform API Running" });
});
app.use(errorHandler);

module.exports = app;
