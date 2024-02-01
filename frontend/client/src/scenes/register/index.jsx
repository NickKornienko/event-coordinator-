import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

import AuthService from "../../services/AuthService.js";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = () => {
    AuthService.register(name, email, password)
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Registration successful. Please login.");
        setErrorMsg("");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        setErrorMsg(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        setSuccessMsg("");
      });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary[500],
      }}
    >
      <Box
        mb={7}
        sx={{
          width: "400px",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.purpleAccent[500],
          borderRadius: "15px",
        }}
      >
        {/* Title and Subtitle */}
        <Typography
          variant="h4"
          color={colors.primary[500]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0px" }}
        >
          Create Your Account
        </Typography>

        {/* Name Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 1,
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.purpleAccent[900],
              "& .MuiInputBase-input": {
                color: colors.purpleAccent[900],
              },
            }}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        {/* Email Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 1,
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.purpleAccent[900],
              "& .MuiInputBase-input": {
                color: colors.purpleAccent[900],
              },
            }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* Password Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 1,
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.purpleAccent[900],
              "& .MuiInputBase-input": {
                color: colors.purpleAccent[900],
              },
            }}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        {/* Confirm Password Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 4,
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.purpleAccent[900],
              "& .MuiInputBase-input": {
                color: colors.purpleAccent[900],
              },
            }}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Success Message */}
          {successMsg && (
            <Box
              sx={{
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
                borderRadius: "7px",
                width: "75%",
                padding: "10px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <Typography>{successMsg}</Typography>
            </Box>
          )}
        </Box>

        {/* Error Message */}
        {errorMsg && (
          <Box
            sx={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
              borderRadius: "7px",
              width: "75%",
              padding: "10px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>{errorMsg}</Typography>
          </Box>
        )}

        {/* Register Button */}
        <Button
          variant="contained"
          sx={{
            width: "50%",
            height: "50px",
            textTransform: "none",
            fontFamily: ["Inter"].join(","),
            fontSize: "13px",
            borderRadius: "7px",
            margin: "10px 0",
          }}
          onClick={handleRegister}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
