import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Homepage from "./pages/Homepage";
import Historypage from "./pages/Historypage";
import LoginPage from "./pages/LoginPage";
import Signuppage from "./pages/Signuppage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Homepage />} />
          <Route path="history" element={<Historypage />} />
          <Route />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signuppage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
