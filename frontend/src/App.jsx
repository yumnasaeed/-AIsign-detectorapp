import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detector from './pages/Detector';
import SignLibrary from './pages/SignLibrary';
import History from './pages/History';
import Profile from './pages/Profile';
import AuthPage from './pages/AuthPage';

function AppRoutes() {
  const { user } = useApp();
  if (!user) return <AuthPage />;
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      <Navbar />
      <main style={{flex:1}}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/detector" element={<Detector />} />
          <Route path="/library"  element={<SignLibrary />} />
          <Route path="/history"  element={<History />} />
          <Route path="/profile"  element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
