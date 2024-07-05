import Login from "./components/Login";
import Register from "./components/Register";
import StudioDetails from "./components/StudioDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserClasses from "./components/UserClasses";
import PrivateRoutes from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import { Box, Container } from "@mui/material";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Sidebar />
        <Container
          sx={{
            marginTop: "2em",
          }}
        >
          <Routes>
            <Route path="/studios" element={<Home />} />
            <Route path="/studios/:id" element={<StudioDetails />} />
            <Route path="/" element={<Navigate to="/studios" replace />} />
            <Route
              path="/error"
              element={<h1>Oops something went wrong...</h1>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/classes" element={<UserClasses />} />
            </Route>
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
