const express = require('express');
const router = express.Router();

/**
 * GET /
 * Fetches articles with optional category filtering
 * Path: theredfox.us/api/articles?category=Business
 */
router.get('/', async (req, res) => {
    const pool = req.app.get('db');
    const { category } = req.query;

    try {
        let query = 'SELECT * FROM articles';
        let values = [];

        if (category) {
            query += ' WHERE category = $1 ORDER BY created_at DESC LIMIT 20';
            values = [category];
        } else {
            query += ' ORDER BY created_at DESC LIMIT 20';
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error("❌ DB Fetch Error:", error.message);
        res.status(500).json({
            error: "Failed to fetch articles",
            details: error.message
        });
    }
});

/**
 * GET /post/:slug
 * Fetches a single article by its slug (Post Name)
 * Path: theredfox.us/api/articles/post/api-security-test
 */
router.get('/post/:slug', async (req, res) => {
    const pool = req.app.get('db');
    const { slug } = req.params;

    try {
        const query = 'SELECT * FROM articles WHERE slug = $1';
        const result = await pool.query(query, [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: "Not Found", 
                message: "No article found with that slug." 
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("❌ Single Fetch Error:", error.message);
        res.status(500).json({ 
            error: "Internal Server Error", 
            details: error.message 
        });
    }
});

/**
 * POST /
 * Handles incoming AI-generated articles from n8n
 */
router.post('/', async (req, res) => {
    const pool = req.app.get('db');

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Payload missing",
            message: "The server received an empty body."
        });
    }

    const {
        title,
        seo_title,
        category,
        slug,
        content,
        summary,
        image,
        source,
        source_url,
        meta_description,
        published_at
    } = req.body;

    if (!title || !slug) {
        return res.status(400).json({ error: "Title and Slug are required fields." });
    }

    try {
        const query = `
            INSERT INTO articles (
                title,
                seo_title,
                category,
                slug,
                content,
                summary,
                image,
                source,
                source_url,
                meta_description,
                published_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (slug) DO NOTHING
            RETURNING *;
        `;

        const values = [
            title,
            seo_title || title,
            category || 'General',
            slug.toLowerCase().trim(),
            content,
            summary,
            image,
            source,
            source_url,
            meta_description,
            published_at || new Date()
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            console.log(`⚠️ Article skipped (Duplicate slug): ${slug}`);
            return res.status(409).json({
                message: "Article ignored. A post with this slug already exists."
            });
        }

        console.log(`✅ Article Published [${category || 'General'}]: ${title}`);
        res.status(201).json({
            message: "Article created successfully",
            article: result.rows[0]
        });

    } catch (error) {
        console.error("❌ Database Error:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
});

module.exports = router;
