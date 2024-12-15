module.exports = (table) => {
    const postHandler = require("./post")(table);
    const getHandler = require("./get")(table);
    const getByIdHandler = require("./getById")(table);
    const putHandler = require("./put")(table);
    const putByIdHandler = require("./putById")(table);
    const deleteHandler = require("./delete")(table);

    return {
        postHandler,
        getHandler,
        getByIdHandler,
        putHandler,
        putByIdHandler,
        deleteHandler,
    };
};
