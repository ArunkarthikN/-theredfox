require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const articleRoutes = require("./routes/articles");

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Make the database pool available to all routes via req.app.get('db')
app.set('db', pool);

app.use(cors());
app.use(express.json());

/**
 * SECURITY MIDDLEWARE
 * Protects write operations (POST, PUT, DELETE) while keeping GET public.
 */
const validateApiKey = (req, res, next) => {
    const secretKey = process.env.API_SECRET;
    const userKey = req.headers["x-api-key"];

    // We only protect POST, PUT, and DELETE.
    // GET (reading news and searching) remains public so your website can function.
    if (req.method !== "GET") {
        if (!userKey || userKey !== secretKey) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "You do not have permission to modify data here."
            });
        }
    }
    next();
};

// Health Check
app.get("/", (req, res) => res.json({ status: "ok", message: "The Red Fox API is Live" }));

// Register article routes with security middleware
app.use("/articles", validateApiKey, articleRoutes);
app.use("/api/articles", validateApiKey, articleRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("🦊 Server running on port " + PORT));
