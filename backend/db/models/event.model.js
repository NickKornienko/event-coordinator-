const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idHash: {
      type: DataTypes.STRING,
      allowNull: true, // workaround for id needing to be set before idHash
    },
  });

  Event.addHook("afterCreate", (event, options) => {
    event.idHash = crypto
      .createHash("sha256")
      .update(event.id.toString())
      .digest("hex");
    return event.save();
  });

  Event.associate = (models) => {
    Event.hasMany(models.Attendee, { foreignKey: "eventId" });
    Event.hasMany(models.NonRegisteredAttendee, { foreignKey: "eventId" });
    Event.belongsTo(models.User, { foreignKey: "hostId" });
  };

  return Event;
};
