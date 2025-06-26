import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogContainer from "./ui_components/BlogContainer";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailsPage";
import ProfilePage from "./pages/ProfilePage";
import Faq from './pages/Faq';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import SignUpPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getUsername } from "./services/apiBlog";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SearchPage from "./pages/SearchPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFOundPage";

const queryclient = new QueryClient()

const App = () => {

  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {data} = useQuery({
      queryKey: ["username"],
      queryFn: getUsername,
  })

  // ensures that when page reloads our navbar stays same and dont set default values of isAuthenticated etc
  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout 
          isAuthenticated={isAuthenticated} username={username} setUsername={setUsername} setIsAuthenticated={setIsAuthenticated}/>}>
            <Route index element={<HomePage />} />
            <Route path="/blogs/:id" element={<DetailPage username={username} isAuthenticated={isAuthenticated}/>} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" 
                element={<LoginPage
                    setIsAuthenticated={setIsAuthenticated}
                    setUsername={setUsername}
                  />}>
            </Route>
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreatePostPage isAuthenticated={isAuthenticated}/>
                </ProtectedRoute>
              }
            />
            <Route path="profile/:username" 
            element={<ProfilePage authusername={username}/>} />          
            <Route path="/faq" element={<Faq />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;