import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import DossiersMedicaux from "./pages/DossiersMedicaux";
import DossierDetail from "./pages/DossierDetail";
import RendezVous from "./pages/RendezVous";
import Ordonnances from "./pages/Ordonnances";
import Facturation from "./pages/Facturation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/dossiers" element={<DossiersMedicaux />} />
            <Route path="/dossiers/:id" element={<DossierDetail />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/ordonnances" element={<Ordonnances />} />
            <Route path="/facturation" element={<Facturation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
