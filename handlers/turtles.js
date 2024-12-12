const express = require("express");

module.exports = (db) => {
    const router = express.Router();

    router.post("/", async ({ body }, res) => {
        try {
            const turtle = await db.turtles.create(body);
            res.json(turtle);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    return router;
};
