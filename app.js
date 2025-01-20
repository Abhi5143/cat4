const express = require("express");
const geoip = require("geoip-lite");
const path = require("path");

const app = express();

// Serve a static image and track IP
app.get("/track", (req, res) => {
    // Extract the real IP address, considering proxy headers
    const ip = (req.headers["x-forwarded-for"] || req.connection.remoteAddress).split(',')[0].trim();
    const geo = geoip.lookup(ip);

    console.log("Visitor Details:");
    console.log("IP Address:", ip);
    if (geo) {
        console.log("Location:", geo);
    } else {
        console.log("Location: Not available");
    }

    res.sendFile(path.join(__dirname, "cutie.jpg")); // Serve the image
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
