import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './lib/i18n';
import { AuthProvider } from './lib/auth';
import { StoreProvider } from './lib/store';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Store from './pages/Store';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Affiliate from './pages/Affiliate';
import AITools from './pages/AITools';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Checkout from './pages/Checkout';
import Editor from './pages/Editor';
import Analytics from './pages/Analytics';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:category" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/store" element={<Store />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/tools" element={<AITools />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/editor/:id" element={<Editor />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </StoreProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;