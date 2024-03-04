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
  const [links, setLinks] = useState({});

  useEffect(() => {
    DbService.get_events()
      .then((response) => {
        console.log("Events fetched: ", response.data);
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

  const generateLink = (eventId) => {
    const newLink = `${window.location.origin}/external-event/${eventId}`;
    setLinks((prevLinks) => ({ ...prevLinks, [eventId]: newLink }));
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Upcoming Events
      </Typography>
      {events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((singleEvent, eventIndex) => (
          <Box
            key={singleEvent.id}
            sx={{
              mb: 4,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {singleEvent.eventName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Date: {singleEvent.date}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Time: {singleEvent.time}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ mb: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Attendee Name</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {singleEvent.attendees.map((attendee, index) => (
                      <TableRow
                        key={`event-${singleEvent.id}-row-${index}`}
                        sx={{
                          bgcolor:
                            index % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : "none",
                        }}
                      >
                        <TableCell>{attendee.name}</TableCell>
                        <TableCell>{attendee.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {user &&
                  user.role === "host" &&
                  user.id === singleEvent.hostId && (
                    <>
                      <Button
                        onClick={() =>
                          handleEdit(
                            singleEvent.id,
                            singleEvent.eventName,
                            singleEvent.size,
                            singleEvent.date,
                            singleEvent.time
                          )
                        }
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(singleEvent.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                {user && user.role !== "host" && (
                  <>
                    <Button onClick={() => generateLink(singleEvent.id)}>
                      Generate Invite Link
                    </Button>
                    {links[singleEvent.id] && (
                      <div>
                        <p>Event ID: {singleEvent.id}</p>
                        <p>{links[singleEvent.id]}</p>
                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(links[singleEvent.id])
                          }
                        >
                          Copy to Clipboard
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </Box>
            </Paper>
          </Box>
        ))}
    </Box>
  );
};

export default Dashboard;
