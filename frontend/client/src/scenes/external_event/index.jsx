import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const ExternalEvent = ({ match }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(`/public-event/${match.params.eventId}`);
      setEvent(response.data);
    };
    fetchEvent();
  }, [match.params.eventId]);

  const handleJoin = () => {
    // Handle join event
  };

  const handleDecline = () => {
    // Handle decline event
  };

  return (
    event && (
      <div>
        <h1>{event.eventName}</h1>
        <p>{event.date}</p>
        <p>{event.time}</p>
        <Button onClick={handleJoin}>Join</Button>
        <Button onClick={handleDecline}>Decline</Button>
      </div>
    )
  );
};

export default ExternalEvent;
