import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LeadCapturePage from './pages/LeadCapturePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/offer" element={<LeadCapturePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;