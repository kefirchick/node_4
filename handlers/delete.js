module.exports = (table) => {
    return async ({ params }, res, next) => {
        try {
            const deleted = await table.destroy({
                where: params,
            });

            if (!deleted) {
                return next({ status: 404, message: "No such Id" });
            }

            res.sendStatus(204);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    }
}