const { buildWhere } = require("../helper");

module.exports = (table) => {
    return async ({ query, body }, res, next) => {
        try {
            const where = buildWhere(query);
            const records = await table.update(body, {
                where,
                returning: true,
            });

            if (!records[0]) {
                return next({ status: 404, message: "No such records" });
            }

            res.json(records);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    };
};
