import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Login } from "../login/Login";
import { RegisterForm } from "../register/Register";

export const ToggleAuth: React.FC = () => {
  const [hiddenLogin, setHiddenLogin] = useState(false);

  const toggleForm = () => {
    setHiddenLogin(!hiddenLogin);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
      bgcolor="#f0f0f0"
    >
      <Box display="flex" width="100%" height="100dvh" overflow="hidden">
        <Box
          component="div"
          width="100%"
          display="flex"
          sx={{
            transition: "transform 0.5s ease-in-out",
            transform: hiddenLogin ? "translateX(0)" : "translateX(50%)",
            position: "relative",
          }}
        >
          <Box component="div" width="50%">
            <Login />
          </Box>
          <Box component="div" width="50%">
            <RegisterForm />
          </Box>
        </Box>

        <Box
          sx={{
            width: "50%",
            height: "100%",
            position: "absolute",
            zIndex: 2,
            bgcolor: "#e0eff1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" mb={2}>
            {hiddenLogin ? "É novo por aqui?" : "Bem-vindo de volta!"}
          </Typography>
          <Typography variant="body1" mb={2}>
            {hiddenLogin
              ? "Faça seu cadastro para começar a usar o sistema"
              : "Faça login para acessar o sistema"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleForm}
            sx={{ mb: 2 }}
          >
            Fazer {hiddenLogin ? "Login" : "Cadastro"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
