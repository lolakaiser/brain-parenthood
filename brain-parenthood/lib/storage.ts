/**
 * LocalStorage utility for Brain Parenthood MVP
 * Provides type-safe storage for user progress data
 */

export interface BaselineData {
  teamStressLevel: number;
  individualStressLevel: number;
  productivity: number;
  communication: number;
  workLifeBalance: number;
  teamSize: string;
  primaryChallenges: string;
  completedAt?: string;
}

export interface GoalsData {
  stressReduction: string;
  productivityGoal: string;
  communicationGoal: string;
  personalGoal: string;
  teamGoal: string;
  successMetrics: string;
  completedAt?: string;
}

export interface UserProgress {
  completedModules: number[];
  currentModule: number;
  lastActivity?: string;
}

// Storage keys
const STORAGE_KEYS = {
  BASELINE: 'brainParenthood_baseline',
  GOALS: 'brainParenthood_goals',
  PROGRESS: 'brainParenthood_progress',
};

// Baseline Assessment
export function saveBaseline(data: BaselineData): void {
  try {
    const dataWithTimestamp = {
      ...data,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.BASELINE, JSON.stringify(dataWithTimestamp));
    saveModuleAnswers(1, 'assessment', data);
  } catch (error) {
    console.error('Error saving baseline data:', error);
  }
}

export function getBaseline(): BaselineData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BASELINE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading baseline data:', error);
    return null;
  }
}

// Goals
export function saveGoals(data: GoalsData): void {
  try {
    const dataWithTimestamp = {
      ...data,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(dataWithTimestamp));
    saveModuleAnswers(1, 'goals', data);
  } catch (error) {
    console.error('Error saving goals data:', error);
  }
}

export function getGoals(): GoalsData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading goals data:', error);
    return null;
  }
}

// Progress Tracking
export function saveProgress(data: UserProgress): void {
  try {
    const dataWithTimestamp = {
      ...data,
      lastActivity: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(dataWithTimestamp));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
}

export function getProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : { completedModules: [], currentModule: 1 };
  } catch (error) {
    console.error('Error loading progress data:', error);
    return { completedModules: [], currentModule: 1 };
  }
}

export function completeModule(moduleId: number): void {
  const progress = getProgress();
  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
    progress.completedModules.sort((a, b) => a - b);
  }
  // Set current module to next incomplete module
  const nextModule = moduleId + 1;
  if (nextModule <= 12 && !progress.completedModules.includes(nextModule)) {
    progress.currentModule = nextModule;
  }
  saveProgress(progress);
  // Fire-and-forget sync to MongoDB
  syncProgressToDB(progress);
}

// Module Answers (assessment + goals per module)
export function saveModuleAnswers(
  moduleId: number,
  step: 'assessment' | 'goals',
  answers: Record<string, unknown>
): void {
  // Save to localStorage
  try {
    const key = `brainParenthood_module${moduleId}_${step}`;
    localStorage.setItem(key, JSON.stringify({ ...answers, savedAt: new Date().toISOString() }));
  } catch (error) {
    console.error('Error saving module answers to localStorage:', error);
  }
  // Fire-and-forget sync to MongoDB
  const token = getAuthToken();
  if (!token) return;
  fetch('/api/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ moduleId, step, answers }),
  }).catch((error) => console.error('Error syncing answers to DB:', error));
}

// --- MongoDB sync helpers ---

function getAuthToken(): string | null {
  try {
    return localStorage.getItem('authToken');
  } catch {
    return null;
  }
}

export async function syncProgressToDB(progress: UserProgress): Promise<void> {
  const token = getAuthToken();
  if (!token) return;
  try {
    await fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        completedModules: progress.completedModules,
        currentModule: progress.currentModule,
      }),
    });
  } catch (error) {
    console.error('Error syncing progress to DB:', error);
  }
}

export async function loadProgressFromDB(): Promise<UserProgress | null> {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const res = await fetch('/api/progress', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function isModuleCompleted(moduleId: number): boolean {
  const progress = getProgress();
  return progress.completedModules.includes(moduleId);
}

// Clear all data (useful for testing)
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.BASELINE);
  localStorage.removeItem(STORAGE_KEYS.GOALS);
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}
