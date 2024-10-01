import { Box, Typography, Container, Toolbar } from "@mui/material";
import Dashboard from "../dashboard/Dashboard";

function HomePage() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "500",
            color: "primary.main",
            mb: 4,
            textAlign: "center",
          }}
        >
          Welcome, Admin!
        </Typography>
        <Dashboard />
      </Container>
    </Box>
  );
}

export default HomePage;
