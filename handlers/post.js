module.exports = (table) => {
    return async ({ body }, res, next) => {
        try {
            const record = await table.create(body);
            res.status(201).json(record);
        } catch (err) {
            return next({ status: 500, message: err.message });
        }
    };
};
