import { useState, useEffect } from 'react';
import { ArrowLeft, Recycle, Droplets, Bike, ShoppingBag, TreePine, Award, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';
import { StorageService, Challenge } from '../services/storageService';

interface WeeklyChallengesProps {
  onBack: () => void;
}

const ICON_MAP = {
  Recycle,
  Droplets,
  Bike,
  ShoppingBag,
  TreePine,
};

export function WeeklyChallenges({ onBack }: WeeklyChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [badges, setBadges] = useState(StorageService.getBadges());

  useEffect(() => {
    // Load challenges from localStorage
    setChallenges(StorageService.getChallenges());
  }, []);

  const handleRegisterProgress = (challengeId: number) => {
    StorageService.incrementChallengeProgress(challengeId);
    // Refresh challenges and badges from storage
    setChallenges(StorageService.getChallenges());
    setBadges(StorageService.getBadges());
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const totalProgress = challenges.length > 0
    ? Math.round(challenges.reduce((sum, c) => sum + c.progress, 0) / challenges.length)
    : 0;

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
            <span className="text-sm font-semibold text-amber-700">{badges.filter(b => b.earned).length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Banner de progreso semanal */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-lg font-bold mb-2">Tu progreso esta semana</h2>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold">{totalProgress}%</span>
            <span className="text-emerald-100 mb-2">completado</span>
          </div>
          <Progress value={totalProgress} className="h-3 bg-white/20" />
        </div>

        {/* Lista de retos */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const Icon = ICON_MAP[challenge.icon as keyof typeof ICON_MAP];
            const bgColor = challenge.completed ? 'bg-emerald-50 border-emerald-300' : 'bg-white';

            return (
              <div
                key={challenge.id}
                className={`${bgColor} rounded-2xl p-5 shadow-md border-2 ${challenge.completed ? 'border-emerald-300' : 'border-transparent'}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`bg-${challenge.color}-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {Icon && <Icon className="w-6 h-6 text-white" />}
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
                    <button
                      onClick={() => handleRegisterProgress(challenge.id)}
                      className={`px-4 py-2 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white text-sm rounded-lg transition-colors`}
                    >
                      Registrar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje motivacional */}
        {completedCount < challenges.length ? (
          <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 border-2 border-purple-200">
            <p className="text-center text-sm text-purple-900">
              <span className="font-semibold">¡Vas muy bien! 🎉</span><br />
              {challenges.length - completedCount === 1
                ? 'Solo un reto más para completar esta semana'
                : `${challenges.length - completedCount} retos por completar esta semana`}
            </p>
          </div>
        ) : (
          <div className="mt-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-5 border-2 border-emerald-300">
            <p className="text-center text-sm text-emerald-900">
              <span className="font-semibold">¡Felicitaciones! 🏆</span><br />
              Has completado todos los retos de esta semana
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
