import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { HomePage } from "./pages/home";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import { ToggleAuth } from "./components/auth/toggleAuth";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={5}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<ToggleAuth />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
