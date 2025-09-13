import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Homepage from "./pages/Homepage";
import Historypage from "./pages/Historypage";
import LoginPage from "./pages/LoginPage";
import Signuppage from "./pages/Signuppage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Krookypage from "./pages/Krookypage";
import Helppage from "./pages/Helppage";
import Predictpage from "./pages/Predictpage";
import DoctorHistory from "./features/History/DoctorHistory";
// import DoctorPredictpage from "./pages/DoctorPredictpage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
            <Route path="krooky" element={<Krookypage />} />
            <Route path="help" element={<Helppage />} />
            <Route path="predict" element={<Predictpage />} />
            <Route path="history" element={<Historypage />} />
            <Route path="history/:patientId" element={<DoctorHistory />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signuppage />} />
        </Routes>

        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
