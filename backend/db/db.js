const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define all models
const User = require("./models/user.model")(sequelize, DataTypes);

const initializeDatabase = async () => {
    try {
        await sequelize.sync();
        console.log("Database & tables created!");
        return { User };
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};

module.exports = initializeDatabase;
