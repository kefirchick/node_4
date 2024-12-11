const Turtle = require("./turtle");
const Weapon = require("./weapon");
const Pizza = require("./pizza");

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        config
    );

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    turtles.belongsTo(weapons);
    weapons.hasOne(turtles);
    turtles.belongsTo(pizzas, { foreignKey: "firstFavoritePizzaId" });
    pizzas.hasMany(turtles, { foreignKey: "firstFavoritePizzaId" });
    turtles.belongsTo(pizzas, { foreignKey: "secondFavoritePizzaId" });
    pizzas.hasMany(turtles, { foreignKey: "secondFavoritePizzaId" });

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};
