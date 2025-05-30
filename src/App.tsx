
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CalmNow from "./pages/CalmNow";
import QuitPlan from "./pages/QuitPlan";
import Support from "./pages/Support";
import PDFAnalyzer from "./pages/PDFAnalyzer";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="calm" element={<CalmNow />} />
            <Route path="plan" element={<QuitPlan />} />
            <Route path="support" element={<Support />} />
            <Route path="analyzer" element={<PDFAnalyzer />} />
            <Route path="marketplace" element={<Marketplace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
