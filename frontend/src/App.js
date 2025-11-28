import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Components
import './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportIncident from './components/ReportIncident';
import Courses from './components/Courses';
import Resources from './components/Resources';
import Support from './components/Support';
import AI from './pages/AI';
import Curriculum from './pages/Curriculum';
import AdminCurriculumEditor from './components/AdminCurriculumEditor';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f5f5;
    color: #333;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background: #f5f5f5;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Listen for storage changes (e.g., from other tabs or after login redirect)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/report" 
              element={isAuthenticated ? <ReportIncident /> : <Navigate to="/login" />} 
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route 
              path="/admin/curriculum" 
              element={isAuthenticated && (user?.role === 'admin' || user?.role === 'educator') ? <AdminCurriculumEditor user={user} /> : <Navigate to="/login" />} 
            />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainContent>

        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
