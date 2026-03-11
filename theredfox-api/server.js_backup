require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const articleRoutes = require("./routes/articles");

const app = express();
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

app.set('db', pool);
app.use(cors());
app.use(express.json());

// --- SECURITY MIDDLEWARE ---
const validateApiKey = (req, res, next) => {
// Change this line inside your validateApiKey function:
const secretKey = process.env.API_SECRET;  
const userKey = req.headers["x-api-key"];

  // We only protect POST, PUT, and DELETE. 
  // GET (reading news) remains public so your website can show articles.
  if (req.method !== "GET") {
    if (!userKey || userKey !== secretKey) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "You do not have permission to post news here." 
      });
    }
  }
  next();
};

app.get("/", (req, res) => res.json({ status: "ok", message: "API is Live" }));

// Apply security check to all article routes
app.use("/articles", validateApiKey, articleRoutes);
app.use("/api/articles", validateApiKey, articleRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("🦊 Server running on port " + PORT));
