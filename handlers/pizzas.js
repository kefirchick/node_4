const express = require("express");

module.exports = (db) => {
    const router = express.Router();

    router.post("/", async ({ body }, res) => {
        try {
            const news = await db.pizzas.create(body);
            res.json(news);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    return router;
};
