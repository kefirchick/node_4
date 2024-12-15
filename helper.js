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

    return where;
}

module.exports = { buildWhere };
