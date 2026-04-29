import { ArrowLeft, Recycle, Droplets, Bike, ShoppingBag, TreePine, Award, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';

interface WeeklyChallengesProps {
  onBack: () => void;
}

export function WeeklyChallenges({ onBack }: WeeklyChallengesProps) {
  const challenges = [
    {
      id: 1,
      title: 'Recicla correctamente',
      description: 'Separa residuos 5 días esta semana',
      icon: Recycle,
      progress: 80,
      current: 4,
      target: 5,
      color: 'emerald',
      badge: '♻️',
    },
    {
      id: 2,
      title: 'Ahorra agua',
      description: 'Cierra el grifo mientras te cepillas',
      icon: Droplets,
      progress: 100,
      current: 7,
      target: 7,
      color: 'blue',
      badge: '💧',
      completed: true,
    },
    {
      id: 3,
      title: 'Transporte sostenible',
      description: 'Ven al colegio caminando o en bici 3 veces',
      icon: Bike,
      progress: 33,
      current: 1,
      target: 3,
      color: 'teal',
      badge: '🚲',
    },
    {
      id: 4,
      title: 'Sin plástico de un solo uso',
      description: 'Usa bolsas reutilizables toda la semana',
      icon: ShoppingBag,
      progress: 60,
      current: 3,
      target: 5,
      color: 'cyan',
      badge: '🛍️',
    },
    {
      id: 5,
      title: 'Plantar vida',
      description: 'Cuida una planta o participa en reforestación',
      icon: TreePine,
      progress: 0,
      current: 0,
      target: 1,
      color: 'green',
      badge: '🌳',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-800">Retos Semanales</h1>
            <p className="text-xs text-gray-500">Del 1 al 7 de marzo</p>
          </div>
          <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-semibold text-amber-700">5</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Banner de progreso semanal */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-lg font-bold mb-2">Tu progreso esta semana</h2>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold">55%</span>
            <span className="text-emerald-100 mb-2">completado</span>
          </div>
          <Progress value={55} className="h-3 bg-white/20" />
        </div>

        {/* Lista de retos */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const bgColor = challenge.completed ? 'bg-emerald-50 border-emerald-300' : 'bg-white';
            
            return (
              <div
                key={challenge.id}
                className={`${bgColor} rounded-2xl p-5 shadow-md border-2 ${challenge.completed ? 'border-emerald-300' : 'border-transparent'}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`bg-${challenge.color}-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                      {challenge.completed && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                      {challenge.current} de {challenge.target} completados
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {challenge.progress}%
                    </span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>

                {/* Insignia */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{challenge.badge}</span>
                    <span className="text-xs text-gray-500">Insignia al completar</span>
                  </div>
                  {!challenge.completed && (
                    <button className={`px-4 py-2 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white text-sm rounded-lg transition-colors`}>
                      Registrar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 border-2 border-purple-200">
          <p className="text-center text-sm text-purple-900">
            <span className="font-semibold">¡Vas muy bien! 🎉</span><br />
            Solo un reto más para completar esta semana
          </p>
        </div>
      </div>
    </div>
  );
}
