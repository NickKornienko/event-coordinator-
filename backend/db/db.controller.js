const Sequelize = require("sequelize");

const { User, Event, Attendee } = require("../db/db");

const create_event = async (req, res) => {
  const { eventName, numberOfSlots, date, time } = req.body;
  const hostId = req.user.userId;

  try {
    const event = await Event.create({
      eventName,
      size: numberOfSlots,
      date,
      time,
    });

    await Attendee.create({
      userId: hostId,
      eventId: event.id,
      role: "host",
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

const edit_event = async (req, res) => {};

const update_attendance = async (req, res) => {};

const get_events = async (req, res) => {
  const userId = req.user.userId;

  try {
    const events = await Event.findAll({
      attributes: ["eventName", "date", "time"],
      include: [
        {
          model: Attendee,
          attributes: ["role"], // Add role to the attributes if you want to include it
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
          required: false,
        },
      ],
    });

    const formattedEvents = events.map((event) => ({
      eventName: event.eventName,
      date: event.date,
      time: event.time,
      size: event.size,
      attendees: event.Attendees.map((attendee) => ({
        name: attendee.User.name,
        role: attendee.role,
      })),
    }));

    console.log("attendees: ", formattedEvents[0].attendees)

    res.status(200).send(formattedEvents);
  } catch (error) {
    console.error("Error getting events: ", error);
    res.status(500).send("Error getting events");
  }
};

module.exports = {
  create_event,
  delete_event,
  edit_event,
  update_attendance,
  get_events,
};
