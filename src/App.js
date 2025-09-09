import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

import Login from './login';
import Signup from './signup';
import Homepage from './mainpage';
import History from './history';
import LandingPage from './components/LandingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignup = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optionally, clear any user-related data from localStorage
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={<Homepage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} 
            />
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/signup" 
              element={isLoggedIn ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} 
            />
            <Route 
              path="/history" 
              element={isLoggedIn ? <History /> : <Navigate to="/login" />} 
            />
            {/* Redirect any other path to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
