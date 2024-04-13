import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Snackbar,
} from "@mui/material";
import DbService from "../../services/DbService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const ExternalEvent = () => {
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    DbService.get_event_by_id(id)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the event", error);
      });
  }, [id]);

  const handleJoin = async () => {
    if (isLoggedIn) {
      await DbService.update_attendance(id);
    } else {
      if (name && email) {
        await DbService.update_attendance(id, name, email);
        setName("");
        setEmail("");
      }
    }
    const updatedEvent = await DbService.get_event_by_id(id);
    setEvent(updatedEvent.data);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDecline = () => {
    navigate("/dashboard");
  };

  return (
    event && (
      <Box sx={{ m: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {event.eventName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Date: {event.date}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Time: {event.time}
        </Typography>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity="success"
            elevation={6}
            variant="filled"
          >
            Successfully joined the event!
          </MuiAlert>
        </Snackbar>
        {!isLoggedIn && (
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        )}
        <Button onClick={handleJoin} sx={{ mr: 1 }}>
          Join
        </Button>
        <Button onClick={handleDecline}>Decline</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.attendees.map((attendee, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {attendee.name}
                  </TableCell>
                  <TableCell align="right">{attendee.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  );
};

export default ExternalEvent;
