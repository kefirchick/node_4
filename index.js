require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const config = require("./config.json");
const db = require("./models")(Sequelize, config);
const turtlesRouter = require("./routers/turtles")(db);
const pizzasRouter = require("./routers/pizzas")(db);
const weaponsRouter = require("./routers/weapons")(db);

const app = express();

app.use(express.json());

app.use("/api/pizzas", pizzasRouter);
app.use("/api/weapons", weaponsRouter);
app.use("/api/turtles", turtlesRouter);

app.use((req, res, next) => {
    next({ status: 404, message: "Not Found" });
});

app.use((err, req, res, next) => {
    res.status(err.status ?? 500);
    res.json({ error: err.message });
});

db.sequelize
    .sync()
    .then(() => {
        console.log("Database synced successfully");
        app.listen(3000, () => {
            console.log(`Server started listening port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });
