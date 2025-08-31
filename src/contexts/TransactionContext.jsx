import React, { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('controlai_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Dados de exemplo
      const exampleTransactions = [
        {
          id: '1',
          type: 'despesa',
          amount: 45.90,
          category: 'Alimentação',
          description: 'Almoço no restaurante',
          date: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'receita',
          amount: 2500.00,
          category: 'Salário',
          description: 'Salário mensal',
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          type: 'despesa',
          amount: 120.00,
          category: 'Transporte',
          description: 'Combustível',
          date: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: '4',
          type: 'despesa',
          amount: 89.99,
          category: 'Lazer',
          description: 'Cinema com amigos',
          date: new Date(Date.now() - 259200000).toISOString(),
        }
      ];
      setTransactions(exampleTransactions);
      localStorage.setItem('controlai_transactions', JSON.stringify(exampleTransactions));
    }
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('controlai_transactions', JSON.stringify(updatedTransactions));
  };

  const getBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'receita' 
        ? acc + transaction.amount 
        : acc - transaction.amount;
    }, 0);
  };

  const getExpensesByCategory = () => {
    const expenses = transactions.filter(t => t.type === 'despesa');
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount
    }));
  };

  const value = {
    transactions,
    addTransaction,
    getBalance,
    getExpensesByCategory
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};