module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define("Attendee", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Events",
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Attendee.associate = (models) => {
    Attendee.belongsTo(models.User, { foreignKey: "userId" });
    Attendee.belongsTo(models.Event, { foreignKey: "eventId" });
  };

  return Attendee;
};
