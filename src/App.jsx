import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import NewTransaction from '@/pages/NewTransaction';
import Reports from '@/pages/Reports';
import { AuthProvider } from '@/contexts/AuthContext';
import { TransactionProvider } from '@/contexts/TransactionContext';

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Helmet>
              <title>Controlaí - Controle Financeiro Inteligente</title>
              <meta name="description" content="Chega de se perder nas contas. Controlaí é seu app de controle financeiro pessoal com visual moderno e funcionalidades inteligentes." />
              <meta property="og:title" content="Controlaí - Controle Financeiro Inteligente" />
              <meta property="og:description" content="Chega de se perder nas contas. Controlaí é seu app de controle financeiro pessoal com visual moderno e funcionalidades inteligentes." />
            </Helmet>
            
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/nova-transacao" element={<NewTransaction />} />
              <Route path="/relatorios" element={<Reports />} />
            </Routes>
            
            <Toaster />
          </div>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;