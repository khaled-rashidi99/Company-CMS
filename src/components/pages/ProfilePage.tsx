import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { useAuth } from "../../AuthContext";

const ProfilePage: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper className="text-center" elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>
          <Box sx={{ mt: 2 }}>
            {isLoggedIn ? (
              <>
                <Typography variant="body1" gutterBottom>
                  Welcome! You are logged in.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={logout}
                  fullWidth
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1" gutterBottom>
                  You are not logged in.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={login}
                  fullWidth
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
