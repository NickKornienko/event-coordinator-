import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../theme";
import AuthService from "../services/AuthService.js";
import AccountMenu from "./AccountMenu.jsx";
import HomeIcon from "@mui/icons-material/Home";
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

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      backgroundColor={colors.grey[100]}
    >
      <IconButton onClick={navigateToDashboard} sx={{ marginRight: "auto" }}>
        <HomeIcon />
      </IconButton>
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
