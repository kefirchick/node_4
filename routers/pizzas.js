const express = require("express");
const { buildWhere } = require("../helper");

module.exports = (db) => {
    const router = express.Router();
    const handlers = require("../handlers")(db.pizzas);

    router.post("/", handlers.postHandler);
    router.get("/", handlers.getHandler);
    router.get("/favourites", favPizzasHandler);
    router.get("/:id", handlers.getByIdHandler);
    router.put("/", handlers.putHandler);
    router.put("/:id", handlers.putByIdHandler);
    router.delete("/:id", handlers.deleteHandler);
    router.patch("/", patchPizzaHandler);

    async function favPizzasHandler(req, res, next) {
        try {
            const records = await db.pizzas.findAndCountAll({
                distinct: true,
                include: [
                    {
                        model: db.turtles,
                        as: "firstFavoriteTurtles",
                        attributes: [],
                    },
                    {
                        model: db.turtles,
                        as: "secondFavoriteTurtles",
                        attributes: [],
                    },
                ],
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            "$firstFavoriteTurtles.id$": {
                                [db.Sequelize.Op.ne]: null,
                            },
                        },
                        {
                            "$secondFavoriteTurtles.id$": {
                                [db.Sequelize.Op.ne]: null,
                            },
                        },
                    ],
                },
            });

            if (!records.count) {
                return next({ status: 404, message: "No such records" });
            }

            res.json(records);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    }

    async function patchPizzaHandler({ body, query }, res, next) {
        try {
            const where = buildWhere(query);
            const records = await db.pizzas.update(
                {
                    description: db.Sequelize.fn(
                        "CONCAT",
                        db.Sequelize.col("description"),
                        body.description
                    ),
                },
                { where, returning: true }
            );

            if (!records[0]) {
                return next({ status: 404, message: "No such records" });
            }

            res.json(records);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    }

    return router;
};
