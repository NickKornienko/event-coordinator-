const Sequelize = require("sequelize");

const { User, Event, Attendee } = require("../db/db");

const create_event = async (req, res) => {
  const { eventName, numberOfSlots, date, time } = req.body;
  console.log("req.body: ", req.body);
  try {
    const event = await Event.create({
      hostId: req.user.userId,
      eventName,
      size: numberOfSlots,
      date,
      time,
    });
    res.status(201).send(event);
  } catch (error) {
    console.error("Error creating event: ", error);
    res.status(500).send("Error creating event");
  }
};

const delete_event = async (req, res) => {
  const { event_id } = req.body;
  try {
    await Event.destroy({
      where: {
        id: event_id,
      },
    });
    res.status(200).send("Event deleted");
  } catch (error) {
    console.error("Error deleting event: ", error);
    res.status(500).send("Error deleting event");
  }
};

module.exports = { create_event, delete_event };
