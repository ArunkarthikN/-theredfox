const express = require('express');
const router = express.Router();

/**
 * GET /
 * Fetches articles with pagination and optional category filtering.
 */
router.get('/', async (req, res) => {
    const pool = req.app.get('db');

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const offset = (page - 1) * limit;

        let whereClause = '';
        let values = [];

        if (category) {
            whereClause = 'WHERE category ILIKE $1';
            values = [category];
        }

        const countQuery = `SELECT COUNT(*) FROM articles ${whereClause}`;
        const countResult = await pool.query(countQuery, values);
        const totalArticles = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalArticles / limit);

        const dataValues = [...values, limit, offset];
        const dataQuery = `
            SELECT * FROM articles
            ${whereClause}
            ORDER BY published_at DESC, created_at DESC
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `;

        const result = await pool.query(dataQuery, dataValues);

        res.json({
            articles: result.rows,
            pagination: {
                totalArticles,
                totalPages,
                currentPage: page,
                limit
            }
        });

    } catch (error) {
        console.error("❌ DB Fetch Error:", error.message);
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});

/**
 * GET /post/:slug
 * Fetches a single article and increments the view count
 */
router.get('/post/:slug', async (req, res) => {
    const pool = req.app.get('db');
    const { slug } = req.params;

    try {
        // Increment view count in database
        await pool.query('UPDATE articles SET views = views + 1 WHERE slug = $1', [slug]);

        // Fetch the article data
        const query = 'SELECT * FROM articles WHERE slug = $1';
        const result = await pool.query(query, [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Not Found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("❌ Single Fetch Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * POST /
 * Handles incoming AI-generated articles
 */
router.post('/', async (req, res) => {
    const pool = req.app.get('db');
    const { title, seo_title, category, slug, content, summary, image, source, source_url, meta_description, published_at } = req.body;

    if (!title || !slug) {
        return res.status(400).json({ error: "Title and Slug are required." });
    }

    try {
        const query = `
            INSERT INTO articles (title, seo_title, category, slug, content, summary, image, source, source_url, meta_description, published_at, views)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 0)
            ON CONFLICT (slug) DO NOTHING
            RETURNING *;
        `;

        const values = [title, seo_title || title, category || 'General', slug.toLowerCase().trim(), content, summary, image, source, source_url, meta_description, published_at || new Date()];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(409).json({ message: "Duplicate slug skipped." });
        }

        res.status(201).json({ message: "Article created", article: result.rows[0] });
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
