// EcoEscuela - LocalStorage Service
// Manages all persistent data for the application

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar: string;
  classRoom: string;
  level: number;
  totalPoints: number;
  currentStreak: number;
  joinedDate: string;
  selectedGroup?: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  current: number;
  target: number;
  color: string;
  badge: string;
  completed: boolean;
  completedDate?: string;
}

export interface Badge {
  id: number;
  emoji: string;
  name: string;
  earned: boolean;
  date?: string;
}

export interface AppSettings {
  language: string;
  notifications: boolean;
  theme: 'light' | 'dark';
  reminderTime: string;
}

const STORAGE_KEYS = {
  USER: 'ecoescuela_user',
  CHALLENGES: 'ecoescuela_challenges',
  BADGES: 'ecoescuela_badges',
  SETTINGS: 'ecoescuela_settings',
  IS_LOGGED_IN: 'ecoescuela_logged_in',
};

// Default data
const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Recicla correctamente',
    description: 'Separa residuos 5 días esta semana',
    icon: 'Recycle',
    progress: 0,
    current: 0,
    target: 5,
    color: 'emerald',
    badge: '♻️',
    completed: false,
  },
  {
    id: 2,
    title: 'Ahorra agua',
    description: 'Cierra el grifo mientras te cepillas',
    icon: 'Droplets',
    progress: 0,
    current: 0,
    target: 7,
    color: 'blue',
    badge: '💧',
    completed: false,
  },
  {
    id: 3,
    title: 'Transporte sostenible',
    description: 'Ven al colegio caminando o en bici 3 veces',
    icon: 'Bike',
    progress: 0,
    current: 0,
    target: 3,
    color: 'teal',
    badge: '🚲',
    completed: false,
  },
  {
    id: 4,
    title: 'Sin plástico de un solo uso',
    description: 'Usa bolsas reutilizables toda la semana',
    icon: 'ShoppingBag',
    progress: 0,
    current: 0,
    target: 5,
    color: 'cyan',
    badge: '🛍️',
    completed: false,
  },
  {
    id: 5,
    title: 'Plantar vida',
    description: 'Cuida una planta o participa en reforestación',
    icon: 'TreePine',
    progress: 0,
    current: 0,
    target: 1,
    color: 'green',
    badge: '🌳',
    completed: false,
  },
];

const DEFAULT_BADGES: Badge[] = [
  { id: 1, emoji: '♻️', name: 'Reciclador Pro', earned: false },
  { id: 2, emoji: '💧', name: 'Guardián del Agua', earned: false },
  { id: 3, emoji: '🚲', name: 'Movilidad Verde', earned: false },
  { id: 4, emoji: '🌳', name: 'Plantador', earned: false },
  { id: 5, emoji: '🛍️', name: 'Cero Plástico', earned: false },
  { id: 6, emoji: '⚡', name: 'Ahorro Energético', earned: false },
  { id: 7, emoji: '🌍', name: 'Embajador Eco', earned: false },
  { id: 8, emoji: '🥇', name: 'Líder Verde', earned: false },
];

const DEFAULT_SETTINGS: AppSettings = {
  language: 'es',
  notifications: true,
  theme: 'light',
  reminderTime: '18:00',
};

// Storage Service
export const StorageService = {
  // User Management
  saveUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  updateUser(updates: Partial<User>): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.saveUser(updatedUser);
    }
  },

  // Authentication
  setLoggedIn(value: boolean): void {
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, value.toString());
  },

  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
  },

  // Sign Up
  signUp(email: string, username: string, fullName: string): User {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      fullName,
      avatar: 'https://images.unsplash.com/photo-1511551203524-9a24350a5771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc21pbGluZyUyMHRlZW5hZ2VyfGVufDF8fHx8MTc3MjcyMDIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      classRoom: '2°A',
      level: 1,
      totalPoints: 0,
      currentStreak: 0,
      joinedDate: new Date().toISOString(),
    };

    this.saveUser(newUser);
    this.setLoggedIn(true);

    // Initialize challenges and badges for new user
    this.saveChallenges(DEFAULT_CHALLENGES);
    this.saveBadges(DEFAULT_BADGES);

    return newUser;
  },

  // Login
  login(email: string): User | null {
    const user = this.getUser();
    if (user && user.email === email) {
      this.setLoggedIn(true);
      return user;
    }
    return null;
  },

  // Logout
  logout(): void {
    this.setLoggedIn(false);
  },

  // Challenges Management
  saveChallenges(challenges: Challenge[]): void {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  },

  getChallenges(): Challenge[] {
    const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    return data ? JSON.parse(data) : DEFAULT_CHALLENGES;
  },

  updateChallenge(challengeId: number, updates: Partial<Challenge>): void {
    const challenges = this.getChallenges();
    const index = challenges.findIndex(c => c.id === challengeId);

    if (index !== -1) {
      challenges[index] = { ...challenges[index], ...updates };
      this.saveChallenges(challenges);

      // If challenge is completed, award badge
      if (updates.completed && !challenges[index].completed) {
        this.awardBadge(challengeId);
      }
    }
  },

  incrementChallengeProgress(challengeId: number): void {
    const challenges = this.getChallenges();
    const challenge = challenges.find(c => c.id === challengeId);

    if (challenge && !challenge.completed) {
      const newCurrent = Math.min(challenge.current + 1, challenge.target);
      const newProgress = Math.round((newCurrent / challenge.target) * 100);
      const isCompleted = newCurrent >= challenge.target;

      this.updateChallenge(challengeId, {
        current: newCurrent,
        progress: newProgress,
        completed: isCompleted,
        completedDate: isCompleted ? new Date().toISOString() : undefined,
      });

      // Update user points
      if (isCompleted) {
        const user = this.getUser();
        if (user) {
          const pointsToAdd = 50; // Points per completed challenge
          this.updateUser({
            totalPoints: user.totalPoints + pointsToAdd,
            currentStreak: user.currentStreak + 1,
          });
        }
      }
    }
  },

  // Badges Management
  saveBadges(badges: Badge[]): void {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  },

  getBadges(): Badge[] {
    const data = localStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : DEFAULT_BADGES;
  },

  awardBadge(challengeId: number): void {
    const badges = this.getBadges();
    const badgeIndex = badges.findIndex(b => b.id === challengeId);

    if (badgeIndex !== -1 && !badges[badgeIndex].earned) {
      badges[badgeIndex] = {
        ...badges[badgeIndex],
        earned: true,
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      this.saveBadges(badges);
    }
  },

  // Settings Management
  saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getSettings(): AppSettings {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },

  updateSettings(updates: Partial<AppSettings>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = { ...currentSettings, ...updates };
    this.saveSettings(updatedSettings);
  },

  // Reset all data (for testing)
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CHALLENGES);
    localStorage.removeItem(STORAGE_KEYS.BADGES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
  },
};
