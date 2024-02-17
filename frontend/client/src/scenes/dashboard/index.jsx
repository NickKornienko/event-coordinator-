import React, { useState, useEffect } from "react";
import DbService from "../../services/DbService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    DbService.get_events()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events", error);
      });
  }, []);

  const handleAttendance = (event_id, attendee, response) => {
    DbService.update_attendance(event_id, attendee, response)
      .then(() => {
        // Update the UI accordingly, possibly by fetching events again or updating the state directly
      })
      .catch((error) => {
        console.error("Error updating attendance", error);
      });
  };

  const handleEdit = (event_id, event_name, number_of_slots, date, time) => {
    DbService.edit_event(event_id, event_name, number_of_slots, date, time)
      .then(() => {
        // Update the UI accordingly
      })
      .catch((error) => {
        console.error("Error editing event", error);
      });
  };

  const handleDelete = (event_id) => {
    DbService.delete_event(event_id)
      .then(() => {
        // Update the UI accordingly, like removing the event from the list
      })
      .catch((error) => {
        console.error("Error deleting event", error);
      });
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Upcoming Events
      </Typography>
      {events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((event) => (
          <Box
            key={event.id}
            sx={{
              mb: 4,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {event.eventName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Date: {event.date}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Time: {event.time}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ mb: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Attendee Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: event.slots }).map((_, index) => {
                      // Check if there is an attendee for the current index
                      const attendee = event.attendees.find(
                        (att) => att.slot === index
                      );

                      return (
                        <TableRow key={`event-${event.id}-slot-${index}`}>
                          <TableCell>
                            {attendee ? attendee.name : "Slot available"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/* Conditional rendering for host actions */}
                {user && user.role === "host" && user.id === event.hostId && (
                  <>
                    <Button
                      onClick={() =>
                        handleEdit(
                          event.id,
                          event.eventName,
                          event.size,
                          event.date,
                          event.time
                        )
                      }
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(event.id)}>
                      Delete
                    </Button>
                  </>
                )}
                {/* Button for attendee actions */}
                {user && user.role !== "host" && (
                  <Button
                    onClick={() =>
                      handleAttendance(event.id, user.id, !user.isAttending)
                    }
                  >
                    Change Attendance
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
        ))}
    </Box>
  );
};

export default Dashboard;
