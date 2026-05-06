import { useState } from 'react';
import { Leaf, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { StorageService, User } from '../services/storageService';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (isSignUp) {
      // Sign Up
      if (!username || !fullName) {
        setError('Por favor completa todos los campos');
        return;
      }

      const newUser = StorageService.signUp(email, username, fullName);
      onLogin(newUser);
    } else {
      // Login
      const user = StorageService.login(email);
      if (user) {
        onLogin(user);
      } else {
        setError('Usuario no encontrado. Por favor regístrate primero.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-4 shadow-lg">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">EcoEscuela</h1>
          <p className="text-emerald-600">Juntos cuidamos nuestro planeta</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>

          <div className="space-y-4 mb-6">
            {isSignUp && (
              <>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
                  <Input
                    type="text"
                    placeholder="Nombre completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-emerald-200 focus:border-emerald-500"
                  />
                </div>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
                  <Input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 rounded-xl border-emerald-200 focus:border-emerald-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 h-12 rounded-xl border-emerald-200 focus:border-emerald-500"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl mb-3"
          >
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="w-full h-12 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl"
          >
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </Button>
        </div>

        {/* Mensaje motivador */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
          <p className="text-sm text-emerald-700">
            🌱 Cada pequeña acción cuenta. ¡Únete y marca la diferencia!
          </p>
        </div>
      </div>
    </div>
  );
}
