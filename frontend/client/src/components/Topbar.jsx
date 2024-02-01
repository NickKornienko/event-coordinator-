import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../theme";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import AuthService from "../services/AuthService.js";
import AccountMenu from "./AccountMenu.jsx";

const Topbar = () => {
  const [userName, setUserName] = useState("Loading...");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      backgroundColor={colors.grey[100]}
    >

      <Box display="flex" alignItems="center">
        {/* The Typography component is wrapped in a Box with flex properties for alignment */}
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
