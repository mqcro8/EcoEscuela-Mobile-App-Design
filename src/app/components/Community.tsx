import { useState, useEffect } from 'react';
import { ArrowLeft, Users, UserPlus, Search, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';
import { StorageService, User } from '../services/storageService';

interface CommunityProps {
  onBack: () => void;
}

const COLOR_BG_MAP: Record<string, string> = {
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  blue: 'bg-blue-500',
  cyan: 'bg-cyan-500',
  indigo: 'bg-indigo-500',
};

const COLOR_HOVER_MAP: Record<string, string> = {
  emerald: 'hover:bg-emerald-600',
  teal: 'hover:bg-teal-600',
  blue: 'hover:bg-blue-600',
  cyan: 'hover:bg-cyan-600',
  indigo: 'hover:bg-indigo-600',
};

const COLOR_FROM_MAP: Record<string, string> = {
  emerald: 'from-emerald-400',
  teal: 'from-teal-400',
  blue: 'from-blue-400',
  cyan: 'from-cyan-400',
  indigo: 'from-indigo-400',
};

const COLOR_TO_MAP: Record<string, string> = {
  emerald: 'to-emerald-500',
  teal: 'to-teal-500',
  blue: 'to-blue-500',
  cyan: 'to-cyan-500',
  indigo: 'to-indigo-500',
};

export function Community({ onBack }: CommunityProps) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const currentUser = StorageService.getUser();
    setUser(currentUser);
    setSelectedGroup(currentUser?.selectedGroup || currentUser?.classRoom);
  }, []);

  const handleJoinGroup = (groupId: string) => {
    StorageService.updateUser({ selectedGroup: groupId });
    const updatedUser = StorageService.getUser();
    setUser(updatedUser);
    setSelectedGroup(groupId);
  };

  const groups = [
    { id: '1°A', name: '1°A', members: 28, points: 3950, color: 'emerald' },
    { id: '2°A', name: '2°A', members: 25, points: 4520, color: 'teal' },
    { id: '2°B', name: '2°B', members: 24, points: 3720, color: 'blue' },
    { id: '3°A', name: '3°A', members: 22, points: 4180, color: 'cyan' },
    { id: '3°B', name: '3°B', members: 23, points: 4280, color: 'indigo' },
  ].map(group => ({
    ...group,
    joined: group.id === selectedGroup,
  }));

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topMembers = user ? [
    { id: 1, name: 'Carlos López', class: '2°A', points: user.totalPoints - 70, avatar: '👨' },
    { id: 2, name: 'María Torres', class: '2°B', points: user.totalPoints - 100, avatar: '👩' },
    { id: 3, name: 'Juan Pérez', class: '2°A', points: user.totalPoints - 130, avatar: '👦' },
    { id: 4, name: 'Laura Sánchez', class: '3°A', points: user.totalPoints - 160, avatar: '👧' },
  ] : [];

  const currentGroup = groups.find(g => g.joined);

  if (!user) {
    return null;
  }

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
          <h1 className="flex-1 font-bold text-gray-800">Comunidad</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar grupos o estudiantes..."
              className="pl-11 h-12 rounded-xl bg-white shadow-sm border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Banner de grupo actual */}
        {currentGroup && (
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-6 mb-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-teal-100 text-sm">Mi grupo</p>
                <h2 className="text-xl font-bold">Clase {currentGroup.name}</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">{currentGroup.members}</p>
                <p className="text-xs text-teal-100">Miembros</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">{currentGroup.points.toLocaleString()}</p>
                <p className="text-xs text-teal-100">Puntos</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">1°</p>
                <p className="text-xs text-teal-100">Posición</p>
              </div>
            </div>
          </div>
        )}

        {/* Grupos escolares */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Grupos Escolares</h3>
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className={`bg-white rounded-2xl p-5 shadow-md ${group.joined ? 'border-2 border-teal-300' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${COLOR_BG_MAP[group.color] || 'bg-gray-500'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl font-bold text-white">{group.name}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">Clase {group.name}</h4>
                      {group.joined && (
                        <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full">
                          Unido
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {group.members}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {group.points} pts
                      </span>
                    </div>
                  </div>
                  {!group.joined && (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className={`${COLOR_BG_MAP[group.color] || 'bg-gray-500'} ${COLOR_HOVER_MAP[group.color] || 'hover:bg-gray-600'} text-white p-2 rounded-xl transition-colors`}
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Barra de progreso del grupo */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Meta mensual</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {Math.round((group.points / 5000) * 100)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${COLOR_FROM_MAP[group.color] || 'from-gray-400'} ${COLOR_TO_MAP[group.color] || 'to-gray-500'} h-full rounded-full`}
                      style={{ width: `${(group.points / 5000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Miembros destacados */}
        <div className="bg-white rounded-3xl p-5 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">Miembros Destacados</h3>
          <div className="space-y-3">
            {topMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.class}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{member.points}</p>
                  <p className="text-xs text-gray-500">puntos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-5 border-2 border-amber-200">
          <p className="text-center text-sm text-amber-900">
            <span className="font-semibold">🤝 Juntos somos más fuertes</span><br />
            Colabora con tu clase para alcanzar la meta mensual
          </p>
        </div>
      </div>
    </div>
  );
}
