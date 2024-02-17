const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = require("./models/user.model")(sequelize, DataTypes);
const Event = require("./models/event.model")(sequelize, DataTypes);
const Attendee = require("./models/attendee.model")(sequelize, DataTypes);

if (User.associate) {
  User.associate({ Event, Attendee });
}
if (Event.associate) {
  Event.associate({ User, Attendee });
}
if (Attendee.associate) {
  Attendee.associate({ User, Event });
}

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

module.exports = { initializeDatabase, User, Event, Attendee };
