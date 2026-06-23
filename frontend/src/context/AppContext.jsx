import React, { createContext, useContext, useState, useCallback } from 'react';
import { saveHistory as apiSaveHistory } from '../services/api';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const MOCK_SIGNS = [
  { id: 1, name: 'Hello', confidence: 92.45, meaning: 'Wave open hand from forehead outward.', category: 'Greeting', language: 'ASL' },
  { id: 2, name: 'Thank You', confidence: 89.12, meaning: 'Touch chin with fingers, move hand forward.', category: 'Expression', language: 'ASL' },
  { id: 3, name: 'Yes', confidence: 91.00, meaning: 'Fist bobs up and down like a nod.', category: 'Response', language: 'ASL' },
  { id: 4, name: 'No', confidence: 87.30, meaning: 'Index and middle finger tap thumb twice.', category: 'Response', language: 'ASL' },
  { id: 5, name: 'Please', confidence: 88.70, meaning: 'Flat hand rubs circle on chest.', category: 'Polite', language: 'ASL' },
  { id: 6, name: 'Sorry', confidence: 85.50, meaning: 'Fist circles over heart.', category: 'Expression', language: 'ASL' },
  { id: 7, name: 'Help', confidence: 90.10, meaning: 'Fist on palm, both hands lift up.', category: 'Request', language: 'ASL' },
  { id: 8, name: 'Good Morning', confidence: 88.00, meaning: 'Hand rises upward like the sun.', category: 'Greeting', language: 'ASL' },
  { id: 9, name: 'Water', confidence: 90.30, meaning: 'W-shape taps chin twice.', category: 'Noun', language: 'ASL' },
  { id: 10, name: 'Food', confidence: 87.80, meaning: 'Fingertips tap lips.', category: 'Noun', language: 'ASL' },
  { id: 11, name: 'Family', confidence: 91.20, meaning: 'F-hands circle outward to meet.', category: 'Noun', language: 'ASL' },
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [detectedSign, setDetectedSign] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [history, setHistory] = useState([]);

  const signup = useCallback((name, email, password) => {
    if (registeredUsers.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase())) {
      setAuthError('This email is already registered. Please login.');
      return false;
    }
    const newUser = { id: Date.now(), name, email: email.trim().toLowerCase(), password, role: 'ASL Learner' };
    setRegisteredUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setAuthError('');
    return true;
  }, [registeredUsers]);

  const login = useCallback((email, password) => {
    const found = registeredUsers.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!found) { setAuthError('Wrong email or password.'); return false; }
    setUser(found);
    setAuthError('');
    return true;
  }, [registeredUsers]);

  const logout = useCallback(() => {
    setUser(null);
    setDetectedSign(null);
    setHistory([]);
  }, []);

  const detectSign = useCallback(async () => {
    setIsScanning(true);
    setDetectedSign(null);
    await new Promise(r => setTimeout(r, 2000));
    const pool = MOCK_SIGNS.filter(s => s.id !== detectedSign?.id);
    const sign = pool[Math.floor(Math.random() * pool.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const entry = { ...sign, time, id: Date.now() };
    setDetectedSign(entry);
    setHistory(h => [entry, ...h].slice(0, 20));
    apiSaveHistory(entry).catch(() => { });
    setIsScanning(false);
  }, [detectedSign]);

  const clearHistory = useCallback(() => setHistory([]), []);

  return (
    <AppContext.Provider value={{
      user, authMode, setAuthMode, authError, setAuthError,
      signup, login, logout,
      detectedSign, isScanning, history, detectSign, clearHistory, MOCK_SIGNS,
    }}>
      {children}
    </AppContext.Provider>
  );
};