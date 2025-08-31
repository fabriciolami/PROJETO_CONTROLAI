import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactions } from '@/contexts/TransactionContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, DollarSign, TrendingUp } from 'lucide-react';

const NewTransaction = () => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();
  const { toast } = useToast();

  const expenseCategories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Compras',
    'Serviços',
    'Outros'
  ];

  const incomeCategories = [
    'Salário',
    'Freelance',
    'Investimentos',
    'Vendas',
    'Outros'
  ];

  const categories = type === 'despesa' ? expenseCategories : incomeCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const transaction = {
        type,
        amount: parseFloat(amount),
        category,
        description
      };

      addTransaction(transaction);
      
      toast({
        title: "Transação salva com sucesso!",
        description: `${type === 'receita' ? 'Receita' : 'Despesa'} de ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(parseFloat(amount))} adicionada.`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro ao salvar transação",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Nova Transação - Controlaí</title>
        <meta name="description" content="Adicione uma nova receita ou despesa ao seu controle financeiro no Controlaí." />
        <meta property="og:title" content="Nova Transação - Controlaí" />
        <meta property="og:description" content="Adicione uma nova receita ou despesa ao seu controle financeiro no Controlaí." />
      </Helmet>

      {/* Header */}
      <header className="controlai-primary shadow-controlai">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8 text-white" />
              <div>
                <h1 className="bebas-font text-3xl text-white">NOVA TRANSAÇÃO</h1>
                <p className="text-purple-200">Adicione uma receita ou despesa</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-controlai">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-purple-600" />
                Nova Transação
              </CardTitle>
              <CardDescription>
                Preencha os dados da sua receita ou despesa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receita">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                            Receita
                          </div>
                        </SelectItem>
                        <SelectItem value="despesa">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                            Despesa
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={category} onValueChange={setCategory} required disabled={!type}>
                    <SelectTrigger>
                      <SelectValue placeholder={type ? "Selecione a categoria" : "Primeiro selecione o tipo"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    placeholder="Descreva a transação"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 controlai-primary hover:bg-purple-700 text-white shadow-controlai hover-lift"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Salvar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default NewTransaction;