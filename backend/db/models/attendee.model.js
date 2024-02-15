module.exports = (sequelize, DataTypes) => {
    const Attendee = sequelize.define("Attendee", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
        }
      },
    });
  
    Attendee.associate = models => {
      Attendee.belongsTo(models.Event, { foreignKey: 'eventId' });
    };
  
    return Attendee;
  };
  