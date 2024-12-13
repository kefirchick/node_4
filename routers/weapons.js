const express = require("express");

module.exports = (db) => {
    const router = express.Router();
    const handlers = require('../handlers')(db.weapons);

    router.post('/', handlers.postHandler);
    router.get("/", handlers.getHandler);
    router.get("/:id", handlers.getByIdHandler);
    router.put("/", handlers.putHandler);
    router.put("/:id", handlers.putByIdHandler);
    router.delete("/:id", handlers.deleteHandler);

    return router;
};