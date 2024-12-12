const express = require("express");

module.exports = (db) => {
    const router = express.Router();

    router.post("/", async ({ body }, res) => {
        try {
            const pizza = await db.pizzas.create(body);
            res.json(pizza);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    return router;
};
