import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Topbar from "./components/Topbar";
import Login from "./scenes/login";
import Register from "./scenes/register";
import Dashboard from "./scenes/dashboard";
import ChangePassword from "./scenes/change_password";
import Account from "./scenes/account";
import CreateEvent from "./scenes/create_event";

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div className="app">
              <main className={isLoggedIn ? "content" : ""}>
                {isLoggedIn && <Topbar />}
                <Routes>
                  <Route
                    path="/"
                    element={
                      isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      isLoggedIn ? (
                        <Navigate to="/" />
                      ) : (
                        <Login setIsLoggedIn={setIsLoggedIn} />
                      )
                    }
                  />
                  <Route path="/register" element={<Register />} />
                  {isLoggedIn ? (
                    <>
                      <Route
                        path="/change_password"
                        element={<ChangePassword />}
                      />
                      <Route path="/account" element={<Account />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/create_event" element={<CreateEvent />} />
                    </>
                  ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                  )}
                </Routes>
              </main>
            </div>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
