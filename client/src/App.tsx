import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { SharedContent } from "./pages/SharedContent";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import UnauthorizedAccess from "./components/UnauthorizedAccess";

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <UnauthorizedAccess />;
};

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/share/:shareLink" element={<SharedContent />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
