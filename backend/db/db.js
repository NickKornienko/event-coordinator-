require("dotenv").config({ path: "../.env" });
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const User = require("./models/user.model")(sequelize, DataTypes);
const Event = require("./models/event.model")(sequelize, DataTypes);
const Attendee = require("./models/attendee.model")(sequelize, DataTypes);
const NonRegisteredAttendee = require("./models/nonRegisteredAttendee.model")(
  sequelize,
  DataTypes
);

if (User.associate) {
  User.associate({ Event, Attendee });
}
if (Event.associate) {
  Event.associate({ User, Attendee, NonRegisteredAttendee });
}
if (Attendee.associate) {
  Attendee.associate({ User, Event });
}
if (NonRegisteredAttendee.associate) {
  NonRegisteredAttendee.associate({ Event });
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

module.exports = {
  initializeDatabase,
  User,
  Event,
  Attendee,
  NonRegisteredAttendee,
};
