import { ArrowLeft, Globe, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const settingsSections = [
    {
      title: 'Cuenta',
      icon: User,
      items: [
        { label: 'Nombre', value: 'Ana García', type: 'text' },
        { label: 'Correo electrónico', value: 'ana.garcia@escuela.edu', type: 'text' },
        { label: 'Clase', value: '2°A', type: 'text' },
      ],
    },
    {
      title: 'Preferencias',
      icon: Globe,
      items: [
        { label: 'Idioma', type: 'select', options: ['Español', 'English', 'Français'] },
        { label: 'Notificaciones de retos', type: 'switch', value: true },
        { label: 'Notificaciones de logros', type: 'switch', value: true },
      ],
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
          <h1 className="flex-1 font-bold text-gray-800">Ajustes</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Secciones de configuración */}
        <div className="space-y-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 flex items-center gap-3 text-white">
                  <Icon className="w-5 h-5" />
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <div className="p-5 space-y-4">
                  {section.items.map((item, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {item.label}
                      </label>
                      {item.type === 'text' && (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800">
                          {item.value}
                        </div>
                      )}
                      {item.type === 'select' && (
                        <Select defaultValue="Español">
                          <SelectTrigger className="w-full rounded-xl bg-gray-50 border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {item.type === 'switch' && (
                        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                          <span className="text-sm text-gray-600">
                            {item.value ? 'Activado' : 'Desactivado'}
                          </span>
                          <Switch defaultChecked={item.value} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Opciones adicionales */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="p-5 space-y-3">
              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-800">Notificaciones</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-800">Privacidad y seguridad</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-800">Ayuda y soporte</span>
              </button>
            </div>
          </div>

          {/* Botón de cerrar sesión */}
          <button className="w-full bg-white rounded-2xl p-5 shadow-md flex items-center justify-center gap-3 hover:bg-red-50 transition-colors border-2 border-transparent hover:border-red-200">
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">Cerrar Sesión</span>
          </button>
        </div>

        {/* Información de la app */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>EcoEscuela v1.0.0</p>
          <p className="mt-1">Cuidando el planeta juntos 🌍</p>
        </div>
      </div>
    </div>
  );
}
