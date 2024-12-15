module.exports = (table) => {
    return async ({ params, body }, res, next) => {
        try {
            const updated = await table.update(body, {
                where: params,
            });

            if (!updated) {
                return next({ status: 404, message: "No such Id" });
            }

            res.json(updated);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    };
};
