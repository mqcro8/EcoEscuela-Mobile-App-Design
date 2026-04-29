import { Leaf, Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
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
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Iniciar Sesión</h2>
          
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
              <Input 
                type="email" 
                placeholder="Correo electrónico"
                className="pl-11 h-12 rounded-xl border-emerald-200 focus:border-emerald-500"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
              <Input 
                type="password" 
                placeholder="Contraseña"
                className="pl-11 h-12 rounded-xl border-emerald-200 focus:border-emerald-500"
              />
            </div>
          </div>

          <Button 
            onClick={onLogin}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl mb-3"
          >
            Iniciar Sesión
          </Button>
              
          <Button 
            variant="outline"
            className="w-full h-12 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl"
          >
            Registrarse
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
