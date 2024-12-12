const express = require("express");
const Sequelize = require("sequelize");

function buildWhere(query) {
    const where = {};

    for (const key in query) {
        if (Number.isFinite(Number(query[key]))) {
            where[key] = {
                [Sequelize.Op.gt]: query[key],
            };
        } else {
            where[key] = query[key];
        }
    }

    return { where };
}

// function buildUpdateBody(body) {
//     const updateBody = {};

//     for (const key in query) {
//         if (Number.isNan(Number(query[key]))) {
//             updateBody[key] = Sequelize.fn('CONCAT', Sequelize.col(field), value);
//         }
//     }

//     return updateBody;
// }

module.exports = (db) => {
    const router = express.Router();

    router.post("/", async ({ body }, res, next) => {
        try {
            const weapon = await db.weapons.create(body);
            res.status(201).json(weapon);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    router.get("/", async ({ query }, res, next) => {
        try {
            const where = buildWhere(query);
            const weapons = await db.weapons.findAndCountAll(where);

            if (!weapons.count) {
                return next({ status: 404, message: "No such weapons" });
            }

            res.json(weapons);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    router.get("/:id", async ({ params }, res, next) => {
        try {
            const weapons = await db.weapons.findOne({
                where: params,
            });

            if (!weapons) {
                return next({ status: 404, message: "No such Id" });
            }

            res.json(weapons);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    router.put("/", async ({ query, body }, res, next) => {
        try {
            const where = buildWhere(query);
            const weapons = await db.weapons.update(body, where);

            if (!weapons.count) {
                return next({ status: 404, message: "No such weapons" });
            }

            res.json(weapons);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    router.put("/:id", async ({ params, body }, res, next) => {
        try {
            const updated = await db.weapons.update(body, {
                where: params,
            });

            if (!updated) {
                return next({ status: 404, message: "No such Id" });
            }

            res.json(updated);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    router.delete("/:id", async ({ params }, res, next) => {
        try {
            const deleted = await db.weapons.destroy({
                where: params,
            });

            if (!deleted) {
                return next({ status: 404, message: "No such Id" });
            }

            res.sendStatus(204);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    });

    return router;
};
