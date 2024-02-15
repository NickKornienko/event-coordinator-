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
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, { as: "host", foreignKey: "hostId" });
    Event.hasMany(models.Attendee, { as: "attendees" });
  };

  return Event;
};
