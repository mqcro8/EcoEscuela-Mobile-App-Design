import { useState, useEffect } from 'react';
import { Target, BarChart3, Users, Settings, User, Leaf, Droplets, TreePine } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  userName: string;
}

export function MainMenu({ onNavigate, userName }: MainMenuProps) {
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const user = StorageService.getUser();
    if (user) {
      setTotalPoints(user.totalPoints);
    }
  }, []);

  const menuItems = [
    { id: 'challenges', icon: Target, title: 'Retos Ecológicos', color: 'bg-emerald-500', description: 'Completa desafíos semanales' },
    { id: 'statistics', icon: BarChart3, title: 'Estadísticas', color: 'bg-teal-500', description: 'Ver tu progreso' },
    { id: 'community', icon: Users, title: 'Comunidad', color: 'bg-cyan-500', description: 'Únete a grupos' },
    { id: 'settings', icon: Settings, title: 'Ajustes', color: 'bg-blue-500', description: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">EcoEscuela</h1>
              <p className="text-xs text-gray-500">¡Hola, {userName}!</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-200 transition-colors"
          >
            <User className="w-5 h-5 text-emerald-700" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Banner motivador */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">¡Bienvenido de vuelta!</h2>
              <p className="text-emerald-100 text-sm">Sigues marcando la diferencia</p>
            </div>
            <div className="flex gap-2">
              <Droplets className="w-8 h-8 opacity-80" />
              <TreePine className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-xs text-emerald-50 mb-1">Puntos totales</p>
            <p className="text-2xl font-bold">{totalPoints.toLocaleString()} 🌟</p>
          </div>
        </div>

        {/* Menú de navegación */}
        <div className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex items-center gap-4 group"
              >
                <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Consejo del día */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Consejo del día</h3>
              <p className="text-sm text-amber-800">
                Lleva tu propia botella reutilizable al colegio. ¡Ahorrarás plástico y dinero!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
