
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chapters from "./pages/Chapters";
import ChapterView from "./pages/ChapterView";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import DailyVerse from "./pages/DailyVerse";
import Meditate from "./pages/Meditate";

// Create a custom CSS class to restrict max width for mobile app experience
import './index.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="bg-earth-50 min-h-screen flex justify-center">
        <div className="max-w-md w-full bg-earth-50">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/:chapterId" element={<ChapterView />} />
              <Route path="/chapters/:chapterId/:verseId" element={<ChapterView />} />
              <Route path="/daily-verse" element={<DailyVerse />} />
              <Route path="/meditate" element={<Meditate />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
