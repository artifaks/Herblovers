
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Ebooks from "./pages/Ebooks";
import HerbalDatabase from "./pages/HerbalDatabase";
import HerbDetail from "./pages/HerbDetail";
import AdminDashboard from "./pages/AdminDashboard";
import EbooksDiagnostic from "./pages/EbooksDiagnostic";
import HerbComparison from "./pages/HerbComparison";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import Pricing from "./pages/Pricing";
import TestStripe from "./pages/TestStripe";
import DirectStripeTest from "./pages/DirectStripeTest";
import Home from "./pages/Home";
// Import subscription components
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import SubscriptionSuccess from "./pages/subscription/SubscriptionSuccess";
import SubscriptionDashboard from "./pages/subscription/SubscriptionDashboard";
// Import API service components
import ApiManagement from "./pages/api-service/ApiManagement";
import ApiUsage from "./pages/api-service/ApiUsage";
import ApiDocs from "./pages/api-service/ApiDocs";
import ApiAnalytics from "./pages/api-service/ApiAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/herbs" element={<HerbalDatabase />} />
                  <Route path="/herbs/:id" element={<HerbDetail />} />
                  <Route path="/ebooks" element={<Ebooks />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/ebooks/diagnostic" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <EbooksDiagnostic />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/herb-comparison" element={<HerbComparison />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/test-stripe" element={<TestStripe />} />
                  <Route path="/direct-stripe" element={<DirectStripeTest />} />
                  {/* Subscription routes */}
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  <Route path="/subscription/success" element={<SubscriptionSuccess />} />
                  <Route path="/subscription/dashboard" element={
                    <ProtectedRoute>
                      <SubscriptionDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* API Service routes */}
                  <Route path="/api-service/manage" element={<ApiManagement />} />
                  <Route path="/api-service/usage/:keyId" element={<ApiUsage />} />
                  <Route path="/api-service/docs" element={<ApiDocs />} />
                  <Route path="/api-service/analytics" element={
                    <ProtectedRoute>
                      <ApiAnalytics />
                    </ProtectedRoute>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
