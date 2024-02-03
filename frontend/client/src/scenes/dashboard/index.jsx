import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: colors.grey[300],
    overflow: "hidden",
  }));

  return (
    <header>
      <h1>Dashboard</h1>{" "}
    </header>
  );
};

export default Dashboard;
