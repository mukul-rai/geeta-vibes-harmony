
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import Chapters from "./pages/Chapters";
import ChapterView from "./pages/ChapterView";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import DailyVerse from "./pages/DailyVerse";
import Meditate from "./pages/Meditate";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

// Create a custom CSS class to restrict max width for mobile app experience
import './index.css';

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Index />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapters/:chapterId" element={<ChapterView />} />
        <Route path="/chapters/:chapterId/:verseId" element={<ChapterView />} />
        <Route path="/daily-verse" element={<DailyVerse />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="bg-earth-50 dark:bg-earth-900 min-h-screen flex justify-center">
            <div className="max-w-md w-full bg-earth-50 dark:bg-earth-900">
              <AppRoutes />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
