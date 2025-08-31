import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { useToast } from '@/components/ui/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Plus, TrendingUp, TrendingDown, DollarSign, LogOut, BarChart3, Receipt } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { transactions, getBalance, getExpensesByCategory } = useTransactions();
  const navigate = useNavigate();
  const { toast } = useToast();

  const balance = getBalance();
  const expensesByCategory = getExpensesByCategory();
  const recentTransactions = transactions.slice(0, 5);

  const totalIncome = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const pieData = expensesByCategory.map((item, index) => ({
    name: item.category,
    value: item.amount,
    color: ['#7E57C2', '#C6FF00', '#FF6B6B', '#4ECDC4', '#45B7D1'][index % 5]
  }));

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logout realizado com sucesso!",
      description: "Até logo! 👋",
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Dashboard - Controlaí</title>
        <meta name="description" content="Visualize seu resumo financeiro mensal, saldo atual e últimas movimentações no Controlaí." />
        <meta property="og:title" content="Dashboard - Controlaí" />
        <meta property="og:description" content="Visualize seu resumo financeiro mensal, saldo atual e últimas movimentações no Controlaí." />
      </Helmet>

      {/* Header */}
      <header className="controlai-primary shadow-controlai">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8 text-white" />
              <div>
                <h1 className="bebas-font text-3xl text-white">CONTROLAÍ</h1>
                <p className="text-purple-200">Olá, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/relatorios')}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Relatórios
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo do Mês */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Mês</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(balance)}
                  </div>
                  <p className="text-xs text-gray-600">
                    {balance >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receitas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalIncome)}
                  </div>
                  <p className="text-xs text-gray-600">
                    Total de entradas
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(totalExpenses)}
                  </div>
                  <p className="text-xs text-gray-600">
                    Total de saídas
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Nova Transação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/nova-transacao')}
            className="controlai-accent hover:bg-lime-400 text-black font-semibold h-14 px-8 text-lg shadow-controlai hover-lift"
          >
            <Plus className="w-6 h-6 mr-2" />
            Nova Transação
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Pizza */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Gastos por Categoria</CardTitle>
                <CardDescription>
                  Distribuição das suas despesas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma despesa registrada ainda</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Últimas Movimentações */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Últimas Movimentações</CardTitle>
                <CardDescription>
                  Suas transações mais recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            transaction.type === 'receita' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-900">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              {transaction.category} • {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                        <div className={`font-semibold ${
                          transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'receita' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma transação registrada ainda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;