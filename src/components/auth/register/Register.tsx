import { Box, Button, TextField } from "@mui/material";
import { ErrorResponse } from "../../../services/backErrorMsg/BackErrorMsg";
import api from "../../../services/axios/axioConfigs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "react-query";
import { enqueueSnackbar } from "notistack";
import "../login/styles.css";

export const RegisterForm = () => {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (values: ILogin) => {
      const response = await api.post("/auth/register", values);
      const { token } = response.data;
      setAuthToken(token);
      localStorage.setItem("token", token);
      navigate("/home");
    },
    onError: (error: ErrorResponse) => {
      console.error("Login failed", error);
      enqueueSnackbar(
        error.response?.data?.msg
          ? `${error.response?.data?.msg}`
          : "Erro na tentativa de cadastro",
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
          Cadastro
        </Box>

        <Box>
          <TextField
            required
            fullWidth
            size="small"
            id="name"
            label="name"
            variant="filled"
            {...form.register("name")}
            sx={{
              marginY: 2,
            }}
          />

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
          {isLoading ? "Carregando..." : "Cadastre-se"}
        </Button>
      </Box>
    </Box>
  );
};
