import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import Auth from "./pages/Auth"; // Your new unified Auth page

// Define the LandingPage wrapper
const LandingPage = () => (
  <SmoothScroll>
    <Navbar />
    <main className="w-full">
      <Hero />
      <Services />
      <FeaturedProject />
      <Coverage />
      <MapSection />
      <Impact />
      <ContactCTA />
      <Footer />
    </main>
  </SmoothScroll>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/Auth" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth handles both Login and Signup */}
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
    </Router>
  );
}

export default App;