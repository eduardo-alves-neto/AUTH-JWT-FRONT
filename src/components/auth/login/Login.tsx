import { useContext } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/axios/axioConfigs";
import { useMutation } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import "./styles.css";
import { ErrorResponse } from "../../../services/backErrorMsg/BackErrorMsg";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (values: ILogin) => {
      const response = await api.post("/auth/login", values);
      const { token } = response.data;
      setAuthToken(token);
      // localStorage.setItem("token", token);
      navigate("/home");
    },
    onError: (error: ErrorResponse) => {
      console.error("Login failed", error);
      enqueueSnackbar(
        error ? `${error.response?.data?.msg}` : "Erro na tentativa de login",
        {
          variant: "error",
        }
      );
    },
  });

  const submitLogin = (values: ILogin) => {
    mutateAsync(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitLogin)}
      className="container"
    >
      <Box component="div" className="content">
        <Box component="div" className="title">
          Login
        </Box>

        <Box>
          <TextField
            required
            fullWidth
            size="small"
            id="email"
            label="Email"
            variant="filled"
            // autoComplete="email"
            {...form.register("email")}
            sx={{
              marginY: 2,
            }}
          />
          <TextField
            required
            fullWidth
            size="small"
            label="Senha"
            type="password"
            id="password"
            variant="filled"
            // autoComplete="current-password"
            {...form.register("password")}
          />
        </Box>

        <Button
          disabled={isLoading}
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            marginY: 3,
          }}
        >
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>

        <Typography variant="caption">
          Não possui uma conta? <a href="/register">Cadastre-se</a>
        </Typography>
      </Box>
    </Box>
  );
};
