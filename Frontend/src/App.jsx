import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Import UI Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SmoothScroll from "./components/SmoothScroll";
import Services from "./components/Services";
import FeaturedProject from "./components/FeaturedProject";
import Coverage from "./components/Coverage";
import Impact from "./components/Impact";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import MapSection from "./components/MapSection";

// Import Pages
import AdminDashboard from "./pages/AdminDashboard"; 
import UserProfile from "./pages/Profile";
import Auth from "./pages/Auth";
import About from "./components/AboutHero"; // The full About Page we discussed
import ServicesPage from "./pages/ServicesPage"; // Dedicated Services Page
import ImpactPage from "./pages/ImpactPage"; // Dedicated Impact Page
import ContactPage from "./pages/ContactPage";
import AboutHero from "./components/AboutHero";
import AboutPage from "./pages/AboutPage";

// Scroll to Top Helper: Ensures new pages load at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Landing Page: Home, Showcase (FeaturedProject), and Coverage
const LandingPage = () => (
  <SmoothScroll>
    <main className="w-full">
      <Hero />
      <FeaturedProject />
      <Coverage />
      <MapSection />
      <ContactCTA />
    </main>
  </SmoothScroll>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Auth" replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar /> 
      <Routes>
        {/* Main Home Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dedicated Internal Pages */}
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/contact" element={<ContactPage/>} />
        
        {/* Auth & User Routes */}
        <Route path="/Auth" element={<Auth />} />
        <Route 
          path="/Profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;