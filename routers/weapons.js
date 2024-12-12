const express = require("express");

module.exports = (table) => {
    const router = express.Router();
    const {
        postHandler,
        getHandler,
        getByIdHandler,
        putHandler,
        putByIdHandler
    } = require('../handlers')(table);

    router.post('/', postHandler);
    router.get("/", getHandler);
    router.get("/:id", getByIdHandler);
    router.put("/", putHandler);
    router.put("/:id", putByIdHandler);

    router.delete("/:id", );

    return router;
};
