import { ArrowLeft, TrendingUp, Users, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface StatisticsProps {
  onBack: () => void;
}

export function Statistics({ onBack }: StatisticsProps) {
  const weeklyData = [
    { day: 'Lun', points: 45, challenges: 2 },
    { day: 'Mar', points: 30, challenges: 1 },
    { day: 'Mié', points: 60, challenges: 3 },
    { day: 'Jue', points: 40, challenges: 2 },
    { day: 'Vie', points: 55, challenges: 2 },
    { day: 'Sáb', points: 35, challenges: 1 },
    { day: 'Dom', points: 50, challenges: 2 },
  ];

  const monthlyData = [
    { week: 'Sem 1', points: 280 },
    { week: 'Sem 2', points: 320 },
    { week: 'Sem 3', points: 295 },
    { week: 'Sem 4', points: 355 },
  ];

  const classRanking = [
    { position: 1, name: 'Ana García', class: '2°A', points: 1250, isCurrentUser: true },
    { position: 2, name: 'Carlos López', class: '2°A', points: 1180 },
    { position: 3, name: 'María Torres', class: '2°B', points: 1150 },
    { position: 4, name: 'Juan Pérez', class: '2°A', points: 1120 },
    { position: 5, name: 'Laura Sánchez', class: '3°A', points: 1090 },
  ];

  const groupProgress = [
    { group: '2°A', points: 4520, members: 25 },
    { group: '3°B', points: 4280, members: 23 },
    { group: '1°A', points: 3950, members: 28 },
    { group: '2°B', points: 3720, members: 24 },
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
          <h1 className="flex-1 font-bold text-gray-800">Estadísticas</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Resumen general */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">315</p>
            <p className="text-xs text-gray-500">Puntos esta semana</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">11</p>
            <p className="text-xs text-gray-500">Retos completados</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">1°</p>
            <p className="text-xs text-gray-500">En tu clase</p>
          </div>
        </div>

        {/* Tabs de períodos */}
        <Tabs defaultValue="week" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl p-1 shadow-sm mb-4">
            <TabsTrigger value="week" className="rounded-lg">Semanal</TabsTrigger>
            <TabsTrigger value="month" className="rounded-lg">Mensual</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            {/* Gráfico semanal de puntos */}
            <div className="bg-white rounded-3xl p-5 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-4">Puntos esta semana</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="points" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de retos completados */}
            <div className="bg-white rounded-3xl p-5 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-4">Retos completados</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="challenges" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-4">Progreso mensual</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="points" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {/* Ranking de clase */}
        <div className="bg-white rounded-3xl p-5 shadow-md mb-4">
          <h3 className="font-semibold text-gray-800 mb-4">Ranking General</h3>
          <div className="space-y-3">
            {classRanking.map((student) => (
              <div
                key={student.position}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  student.isCurrentUser ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-gray-50'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${student.position === 1 ? 'bg-amber-400 text-white' : ''}
                  ${student.position === 2 ? 'bg-gray-300 text-white' : ''}
                  ${student.position === 3 ? 'bg-orange-400 text-white' : ''}
                  ${student.position > 3 ? 'bg-gray-200 text-gray-600' : ''}
                `}>
                  {student.position === 1 ? '🥇' : student.position === 2 ? '🥈' : student.position === 3 ? '🥉' : student.position}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">
                    {student.name}
                    {student.isCurrentUser && <span className="ml-2 text-xs text-emerald-600">(Tú)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{student.class}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{student.points}</p>
                  <p className="text-xs text-gray-500">puntos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progreso por grupos */}
        <div className="bg-white rounded-3xl p-5 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">Grupos Escolares</h3>
          <div className="space-y-3">
            {groupProgress.map((group, index) => (
              <div key={group.group} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">{group.group}</span>
                    <span className="text-xs text-gray-500">({group.members} estudiantes)</span>
                  </div>
                  <span className="font-bold text-teal-600">{group.points}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full"
                    style={{ width: `${(group.points / 5000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
