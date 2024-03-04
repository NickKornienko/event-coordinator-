module.exports = (sequelize, DataTypes) => {
  const NonRegisteredAttendee = sequelize.define("NonRegisteredAttendee", {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Events",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  NonRegisteredAttendee.associate = (models) => {
    NonRegisteredAttendee.belongsTo(models.Event, { foreignKey: "eventId" });
  };

  return NonRegisteredAttendee;
};
