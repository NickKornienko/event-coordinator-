import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DbService from "../../services/DbService.js";

const CreateEventForm = () => {
  const [eventName, setEventName] = useState("");
  const [numberOfSlots, setNumberOfSlots] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DbService.create_event(eventName, numberOfSlots, date, time);
      alert("Event successfully created!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: "4px",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Divider sx={{ borderColor: "divider", mb: 3 }} />
      <Typography variant="h2" gutterBottom sx={{ color: "black", mb: 2 }}>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          InputLabelProps={{
            style: { color: "black" },
          }}
          sx={textFieldStyle}
        />
        <TextField
          label="Number of Slots"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={numberOfSlots}
          onChange={(e) => setNumberOfSlots(e.target.value)}
          InputLabelProps={{
            style: { color: "black" },
          }}
          sx={textFieldStyle}
        />
        <TextField
          label="Date"
          variant="outlined"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { color: "black" },
          }}
          sx={textFieldStyle}
        />
        <TextField
          label="Time"
          variant="outlined"
          type="time"
          fullWidth
          margin="normal"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { color: "black" },
          }}
          sx={textFieldStyle}
        />
        <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
          Create Event
        </Button>
      </form>
    </Box>
  );
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    "& fieldset": { borderColor: "primary.dark" },
  },
  mb: 2,
};

const buttonStyle = {
  mt: 2,
  bgcolor: "primary.main",
  "&:hover": { bgcolor: "primary.dark" },
  borderRadius: "20px",
  height: "48px",
};

export default CreateEventForm;
