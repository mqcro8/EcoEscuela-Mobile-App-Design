import { ArrowLeft, Award, Target, TrendingUp, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const badges = [
    { id: 1, emoji: '♻️', name: 'Reciclador Pro', earned: true, date: '15 Feb 2026' },
    { id: 2, emoji: '💧', name: 'Guardián del Agua', earned: true, date: '20 Feb 2026' },
    { id: 3, emoji: '🚲', name: 'Movilidad Verde', earned: true, date: '25 Feb 2026' },
    { id: 4, emoji: '🌳', name: 'Plantador', earned: true, date: '1 Mar 2026' },
    { id: 5, emoji: '🛍️', name: 'Cero Plástico', earned: false },
    { id: 6, emoji: '⚡', name: 'Ahorro Energético', earned: false },
    { id: 7, emoji: '🌍', name: 'Embajador Eco', earned: false },
    { id: 8, emoji: '🥇', name: 'Líder Verde', earned: false },
  ];

  const stats = [
    { label: 'Retos completados', value: '24', icon: Target, color: 'emerald' },
    { label: 'Racha actual', value: '7 días', icon: TrendingUp, color: 'orange' },
    { label: 'Puntos totales', value: '1,250', icon: Star, color: 'amber' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="flex-1 font-bold text-gray-800">Mi Perfil</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Información del usuario */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-emerald-100 flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1511551203524-9a24350a5771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc21pbGluZyUyMHRlZW5hZ2VyfGVufDF8fHx8MTc3MjcyMDIwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">Ana García</h2>
              <p className="text-gray-600">Estudiante · Clase 2°A</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-emerald-100 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-emerald-700">Nivel 5</span>
                </div>
                <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-700" />
                  <span className="text-xs font-semibold text-amber-700">4 insignias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={`bg-${stat.color}-50 rounded-xl p-3 text-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600 mx-auto mb-1`} />
                  <p className={`text-lg font-bold text-${stat.color}-700`}>{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insignias obtenidas */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Mis Insignias</h3>
            <span className="text-sm text-gray-500">4 de 8</span>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative ${badge.earned ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className={`
                  w-full aspect-square rounded-2xl flex items-center justify-center text-3xl
                  ${badge.earned ? 'bg-gradient-to-br from-amber-100 to-amber-200 shadow-md' : 'bg-gray-100'}
                `}>
                  {badge.emoji}
                </div>
                <p className="text-xs text-center mt-2 text-gray-700 font-medium line-clamp-2">
                  {badge.name}
                </p>
                {badge.earned && badge.date && (
                  <p className="text-xs text-center text-gray-500">{badge.date}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progreso del nivel */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-purple-100 text-sm">Nivel actual</p>
              <p className="text-2xl font-bold">Nivel 5</p>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Siguiente nivel</p>
              <p className="text-lg font-bold">250 puntos más</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div className="bg-white h-full rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
