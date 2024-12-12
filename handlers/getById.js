module.exports = (table) => {
    return async ({ params }, res, next) => {
        try {
            const record = await table.findOne({
                where: params,
            });

            if (!record) {
                return next({ status: 404, message: "No such Id" });
            }

            res.json(record);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    }
}