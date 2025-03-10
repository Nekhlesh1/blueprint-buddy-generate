
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotFound from "./pages/NotFound";

// New imports for Phase 2
import RecruiterSavedSearches from "./pages/RecruiterSavedSearches";
import CandidateProfile from "./pages/CandidateProfile";
import RecruiterProfile from "./pages/RecruiterProfile";
import SearchResults from "./pages/SearchResults";
import MessageCenter from "./pages/MessageCenter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/register/:userType" element={<Layout><RegisterPage /></Layout>} />
          
          {/* Candidate routes */}
          <Route 
            path="/candidate/dashboard" 
            element={
              <Layout userType="candidate" userName="Alex Johnson">
                <CandidateDashboard />
              </Layout>
            } 
          />
          <Route 
            path="/candidate/profile" 
            element={
              <Layout userType="candidate" userName="Alex Johnson">
                <CandidateProfile />
              </Layout>
            } 
          />
          <Route 
            path="/candidate/messages" 
            element={
              <Layout userType="candidate" userName="Alex Johnson">
                <MessageCenter userType="candidate" />
              </Layout>
            } 
          />
          
          {/* Recruiter routes */}
          <Route 
            path="/recruiter/dashboard" 
            element={
              <Layout userType="recruiter" userName="Taylor Smith">
                <RecruiterDashboard />
              </Layout>
            } 
          />
          <Route 
            path="/recruiter/saved" 
            element={
              <Layout userType="recruiter" userName="Taylor Smith">
                <RecruiterSavedSearches />
              </Layout>
            } 
          />
          <Route 
            path="/recruiter/profile" 
            element={
              <Layout userType="recruiter" userName="Taylor Smith">
                <RecruiterProfile />
              </Layout>
            } 
          />
          <Route 
            path="/recruiter/search" 
            element={
              <Layout userType="recruiter" userName="Taylor Smith">
                <SearchResults />
              </Layout>
            } 
          />
          <Route 
            path="/recruiter/messages" 
            element={
              <Layout userType="recruiter" userName="Taylor Smith">
                <MessageCenter userType="recruiter" />
              </Layout>
            } 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
