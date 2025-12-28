
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MarketOverview } from './pages/MarketOverview';
import { Strategies } from './pages/Strategies';
import { Backtesting } from './pages/Backtesting';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market-overview" element={<MarketOverview />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/backtesting" element={<Backtesting />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
