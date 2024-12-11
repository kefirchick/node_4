require('dotenv').config();
const Sequelize = require("sequelize");
const config = require("./config.json");
const db = require("./models")(Sequelize, config);

db.sequelize.sync()
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });
    
// TODO: запросы к БД
