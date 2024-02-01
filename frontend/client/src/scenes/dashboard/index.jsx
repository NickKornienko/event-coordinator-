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
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Item elevation={0}>
          <Box m="20px"></Box>
        </Item>
      </Grid>
      <Grid item xs>
        <Item elevation={0}>
          <Box backgroundColor={colors.white} height="92vh" overflow="auto">
            <Box p="20px"></Box>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
