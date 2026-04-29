import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainMenu } from './components/MainMenu';
import { WeeklyChallenges } from './components/WeeklyChallenges';
import { UserProfile } from './components/UserProfile';
import { Statistics } from './components/Statistics';
import { Community } from './components/Community';
import { Settings } from './components/Settings';

type Screen = 'login' | 'main' | 'challenges' | 'profile' | 'statistics' | 'community' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const userName = 'Ana';

  const handleLogin = () => {
    setCurrentScreen('main');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen('main');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Contenedor móvil */}
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-2xl">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}
        
        {currentScreen === 'main' && (
          <MainMenu onNavigate={handleNavigate} userName={userName} />
        )}
        
        {currentScreen === 'challenges' && (
          <WeeklyChallenges onBack={handleBack} />
        )}
        
        {currentScreen === 'profile' && (
          <UserProfile onBack={handleBack} />
        )}
        
        {currentScreen === 'statistics' && (
          <Statistics onBack={handleBack} />
        )}
        
        {currentScreen === 'community' && (
          <Community onBack={handleBack} />
        )}
        
        {currentScreen === 'settings' && (
          <Settings onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
