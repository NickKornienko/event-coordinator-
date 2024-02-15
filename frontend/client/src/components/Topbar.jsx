import { Box, IconButton, Typography, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../theme";
import AuthService from "../services/AuthService.js";
import AccountMenu from "./AccountMenu.jsx";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [userName, setUserName] = useState("Loading...");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getUserInfo().then(
      (response) => {
        setUserName(response.data.name);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToCreateEvent = () => {
    navigate("/create_event");
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      backgroundColor={colors.grey[100]}
    >
      <IconButton onClick={navigateToDashboard} sx={{ marginRight: 2 }}>
        <HomeIcon />
      </IconButton>
      <Button 
        startIcon={<EventNoteIcon />} 
        onClick={navigateToCreateEvent}
        sx={{ 
          marginRight: "auto",
          borderRadius: "20px",
          border: "1px solid",
          borderColor: "primary.main",
          textTransform: "none",
          padding: "6px 12px"
        }}
      >
        Create Event
      </Button>

      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" height="100%">
          <Typography
            variant="h5"
            color={colors.primary[500]}
            style={{ lineHeight: "1" }}
          >
            {userName}
          </Typography>
        </Box>
        <AccountMenu />
      </Box>
    </Box>
  );
};

export default Topbar;
