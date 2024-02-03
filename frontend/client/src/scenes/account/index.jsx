import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService.js";
import { Divider, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getUserInfo().then(
      (response) => {
        setName(response.data.name);
        setEmail(response.data.email);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);

  return (
    <Box m="20px">
      <Box>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            mt="20px"
            mb="10px"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              Personal Information
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            mt="20px"
            mb="10px"
          >
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              Name
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" height="100%" mb="20px">
            <Typography
              variant="h4"
              color={colors.primary[500]}
              style={{ lineHeight: "1" }}
            >
              {name}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" height="100%" mb="10px">
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            ></Typography>
          </Box>
        </Box>
        <Box>
          <Divider variant="fullWidth" sx={{ bgcolor: "grey" }} />

          <Box
            display="flex"
            alignItems="center"
            height="100%"
            mt="20px"
            mb="10px"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              Contact Information
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" height="100%" mb="20px">
            <Typography
              variant="h5"
              color={colors.primary[500]}
              style={{ lineHeight: "1" }}
            >
              Email: {email}
            </Typography>
          </Box>

          {/* Change Password link */}
          <Divider variant="fullWidth" sx={{ bgcolor: "grey", my: 4 }} />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              my: 2,
            }}
            onClick={() => {
              navigate("/change_password");
            }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
