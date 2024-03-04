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
  });

  Event.associate = (models) => {
    Event.hasMany(models.Attendee, { foreignKey: "eventId" });
    Event.hasMany(models.NonRegisteredAttendee, { foreignKey: "eventId" });
    Event.belongsTo(models.User, { foreignKey: "hostId" });
  };

  return Event;
};
