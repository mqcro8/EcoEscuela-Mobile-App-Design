import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainMenu } from './components/MainMenu';
import { WeeklyChallenges } from './components/WeeklyChallenges';
import { UserProfile } from './components/UserProfile';
import { Statistics } from './components/Statistics';
import { Community } from './components/Community';
import { Settings } from './components/Settings';
import { StorageService, User } from './services/storageService';

type Screen = 'login' | 'main' | 'challenges' | 'profile' | 'statistics' | 'community' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    if (StorageService.isLoggedIn()) {
      const user = StorageService.getUser();
      if (user) {
        setCurrentUser(user);
        setCurrentScreen('main');
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    setCurrentScreen('login');
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
        
        {currentScreen === 'main' && currentUser && (
          <MainMenu onNavigate={handleNavigate} userName={currentUser.fullName.split(' ')[0]} />
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
          <Settings onBack={handleBack} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
