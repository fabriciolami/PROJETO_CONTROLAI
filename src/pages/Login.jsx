import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, Mail, Lock, TrendingUp } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Controlaí 🎉",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  const handleCreateAccount = () => {
    toast({
      title: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Helmet>
        <title>Login - Controlaí</title>
        <meta name="description" content="Faça login no Controlaí e tenha controle total das suas finanças pessoais." />
        <meta property="og:title" content="Login - Controlaí" />
        <meta property="og:description" content="Faça login no Controlaí e tenha controle total das suas finanças pessoais." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-controlai mb-4"
          >
            <TrendingUp className="w-10 h-10 text-purple-600" />
          </motion.div>
          <h1 className="bebas-font text-5xl text-white mb-2">CONTROLAÍ</h1>
          <p className="text-lime-300 text-lg font-medium">Chega de se perder nas contas.</p>
        </div>

        <Card className="glass-effect border-white/20 shadow-controlai">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Entrar</CardTitle>
            <CardDescription className="text-gray-200">
              Acesse sua conta e controle suas finanças
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/90"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/90"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full controlai-primary hover:bg-purple-700 text-white h-12 text-lg font-semibold shadow-controlai hover-lift"
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
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-200">ou</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full mt-4 bg-white/90 text-gray-700 border-white/30 hover:bg-white h-12"
              >
                <img  alt="Google logo" className="w-5 h-5 mr-2" src="https://images.unsplash.com/photo-1678483789111-3a04c4628bd6" />
                Entrar com Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleCreateAccount}
                className="text-lime-300 hover:text-lime-200 font-medium transition-colors"
              >
                Não tem conta? Criar conta
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;