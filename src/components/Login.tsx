import { useState, useContext } from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",

        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token } = response.data;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Grid
      container
      border={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={6} md={4} lg={3} border={1}>
        <Grid container spacing={2} border={1}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
