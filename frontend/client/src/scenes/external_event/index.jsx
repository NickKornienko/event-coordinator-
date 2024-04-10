import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DbService from "../../services/DbService";
import { useParams } from "react-router-dom";

const ExternalEvent = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams(); // Extract id from URL

  const handleJoin = () => {
    // Handle join event
  };

  const handleDecline = () => {
    //Handle decline event
  };

  return <div>{id}</div>;

};

export default ExternalEvent;
