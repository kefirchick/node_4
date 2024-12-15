const express = require("express");

module.exports = (db) => {
    const router = express.Router();
    const handlers = require("../handlers")(db.turtles);

    router.post("/", handlers.postHandler);
    router.get("/", handlers.getHandler);
    router.get("/by-pizza", getByPizzaHandler);
    router.get("/:id", handlers.getByIdHandler);
    router.put("/", handlers.putHandler);
    router.put("/:id", handlers.putByIdHandler);
    router.delete("/:id", handlers.deleteHandler);
    router.put("/:id/give-pizza", givePizzaHandler);

    async function givePizzaHandler({ params, body }, res, next) {
        try {
            const turtle = await db.turtles.findByPk(params.id);

            if (!turtle) {
                return next({ status: 404, message: "No such Id" });
            }

            const newPizza = await db.pizzas.create(body);
            turtle.firstFavoritePizzaId = newPizza.id;
            await turtle.save();

            res.json(newPizza);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    }

    async function getByPizzaHandler({ query }, res, next) {
        try {
            const turtles = await db.turtles.findAndCountAll({
                include: [
                    {
                        model: db.pizzas,
                        as: "firstFavoriteTurtles",
                        where: { name: query.name },
                        attributes: [],
                    },
                ],
            });

            if (!turtles.count) {
                return next({ status: 404, message: "No such records" });
            }

            res.json(turtles);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    }

    return router;
};
