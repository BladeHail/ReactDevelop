import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Navbar } from "./components/common/Navbar";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./components/Auth/AuthProvider";
import Layout from "./components/common/Layout";
import PlayerListPage from "./pages/PlayerListPage";
import PredictionPage from "./pages/PredictionPage";
import ErrorPage from "./pages/ErrorPage";
import NewsListPage from "./pages/NewsListPage";
import LoginLayout from "./components/common/LoginLayout";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import SocialLoginPage from "./pages/SocialLoginPage";
import UnprotectingRoute from "./components/Auth/UnprotectingRoute";
import LivePage from "./pages/LivePage";
import LiveList from "./pages/LiveList";
import NewPlayerPage from "./pages/NewPlayerPage";

function App() {
  return (
    <div data-theme="dark">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<Home />} />
                <Route path="/players" element={<PlayerListPage />} />
                <Route path="/players/new" element={<NewPlayerPage />} />
                <Route path="/players/:id" element={<ProfilePage />} />
                <Route path="/predictions" element={<PredictionPage />} />
                <Route path="/error/:status" element={<ErrorPage />} />
                <Route path="/news" element={<NewsListPage />} />
                <Route path="/live" element={<LiveList />} />
                <Route path="/live/:videoId" element={<LivePage />} />
              </Route>
            <Route element={<LoginLayout />}>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<UnprotectingRoute><LoginForm /></UnprotectingRoute>} />
              <Route path="/social" element={<SocialLoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
