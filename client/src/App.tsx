import { Dashboard } from "./pages/Dashboard";
import { SharedContent } from "./pages/SharedContent";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/share/:shareLink" element={<SharedContent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;