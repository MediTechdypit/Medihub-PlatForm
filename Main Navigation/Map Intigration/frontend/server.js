require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API route to send the Google Maps API key
app.get("/get-api-key", (req, res) => {
    console.log("📡 API request received at /get-api-key");
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error("❌ Error: GOOGLE_MAPS_API_KEY is missing in .env");
        return res.status(500).json({ error: "API key not found" });
    }

    console.log("✅ Sending API key to frontend");
    res.json({ apiKey });
});

// API route to search nearby hospitals
app.get("/api/nearby-hospitals", async (req, res) => {
    try {
        const { latitude, longitude, radius = 2000 } = req.query;

        if (!latitude || !longitude) {
            console.error("❌ Missing latitude or longitude");
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        console.log("🔍 Searching hospitals near:", latitude, longitude);

        const params = {
            location: `${latitude},${longitude}`,
            radius: radius,
            type: "hospital",
            key: process.env.GOOGLE_MAPS_API_KEY,
        };

        const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", { params });

        console.log("📡 Google Places API Response:", response.data);

        if (response.data.status !== "OK") {
            console.error("❌ Google Places API Error:", response.data.error_message || response.data.status);
            return res.status(400).json({ error: response.data.error_message || "Failed to fetch hospitals" });
        }

        res.json(response.data.results);
    } catch (error) {
        console.error("❌ Error fetching nearby hospitals:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// API route to get details of a specific hospital
app.get("/api/place-details", async (req, res) => {
    try {
        const { place_id } = req.query;

        if (!place_id) {
            return res.status(400).json({ error: "Place ID is required" });
        }

        const params = {
            place_id: place_id,
            key: process.env.GOOGLE_MAPS_API_KEY,
            fields: "name,formatted_phone_number,formatted_address",
        };

        const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", { params });

        if (response.data.status !== "OK") {
            return res.status(400).json({ error: response.data.error_message || "Failed to fetch place details" });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});