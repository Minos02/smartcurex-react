import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DiseaseDetection from './components/DiseaseDetection';
import About from './components/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useScrollReveal } from './hooks/useScrollAnimation';
import ChatBot from './components/ChatBot';

// Pages
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import AlzheimersPage from './pages/AlzheimersPage';
import BrainTumorPage from './pages/BrainTumorPage';
import PneumoniaPage from './pages/PneumoniaPage';
import CovidDetection from './pages/CovidDetection';
import DiabetesPage from './pages/DiabetesPage';
import HeartDiseasePage from './pages/HeartDiseasePage';
import BreastCancerPage from './pages/BreastCancerPage';
import ResultsPage from './pages/ResultsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const HomePage = () => {
  useScrollReveal();
  return (
    <>
      <div className="bg-gradient"></div>
      <Hero />
      <Features />
      <DiseaseDetection />
      <About />
    </>
  );
};

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin';

  return (
    <div className="App">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/alzheimers"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <AlzheimersPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/brain-tumor"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <BrainTumorPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/pneumonia"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <PneumoniaPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/detect/covid"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <CovidDetection />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/diabetes"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <DiabetesPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/heart-disease"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <HeartDiseasePage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/breast-cancer"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <BreastCancerPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <ResultsPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* ChatBot appears on all pages */}
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}


export default App;
