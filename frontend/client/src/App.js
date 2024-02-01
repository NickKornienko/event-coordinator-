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
import Sidebar from "./components/Sidebar";
import Login from "./scenes/login";
import Register from "./scenes/register";
import Dashboard from "./scenes/dashboard";
import ChangePassword from "./scenes/change_password";

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);

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
            {" "}
            {/* Router added here */}
            <div className="app">
              {isLoggedIn && <Sidebar isSidebar={isSidebar} />}
              <main className={isLoggedIn ? "content" : ""}>
                {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />}
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
