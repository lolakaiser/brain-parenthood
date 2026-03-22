// @vitest-environment jsdom
/**
 * TC-U010 – Baseline assessment slider values saved to localStorage
 * TC-U011 – Goal-setting answers saved to localStorage
 * TC-U012 – completeModule updates progress and adds module to completedModules
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveBaseline,
  getBaseline,
  saveGoals,
  getGoals,
  saveProgress,
  getProgress,
  completeModule,
  isModuleCompleted,
  clearAllData,
  BaselineData,
  GoalsData,
} from '@/lib/storage';

// Mock fetch so fire-and-forget DB syncs don't throw in jsdom
global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });

// ── helpers ───────────────────────────────────────────────────────────────────

const sampleBaseline: BaselineData = {
  teamStressLevel: 8,
  individualStressLevel: 7,
  productivity: 6,
  communication: 5,
  workLifeBalance: 4,
  teamSize: '12',
  primaryChallenges: 'Burnout and communication gaps',
};

const sampleGoals: GoalsData = {
  stressReduction: 'Reduce team stress by 30%',
  productivityGoal: 'Ship features 20% faster',
  communicationGoal: 'Daily stand-ups with clear agenda',
  personalGoal: 'Meditate 10 minutes daily',
  teamGoal: 'Build psychological safety',
  successMetrics: 'Monthly eNPS score',
};

// ── tests ─────────────────────────────────────────────────────────────────────

describe('storage – saveBaseline / getBaseline (TC-U010)', () => {
  beforeEach(() => {
    clearAllData();
    vi.clearAllMocks();
  });

  // TC-U010: all slider values round-trip through localStorage correctly
  it('TC-U010a: saves all baseline slider values and reads them back intact', () => {
    saveBaseline(sampleBaseline);
    const result = getBaseline();

    expect(result).not.toBeNull();
    expect(result!.teamStressLevel).toBe(8);
    expect(result!.individualStressLevel).toBe(7);
    expect(result!.productivity).toBe(6);
    expect(result!.communication).toBe(5);
    expect(result!.workLifeBalance).toBe(4);
    expect(result!.teamSize).toBe('12');
    expect(result!.primaryChallenges).toBe('Burnout and communication gaps');
  });

  it('TC-U010b: saved baseline includes a completedAt timestamp', () => {
    saveBaseline(sampleBaseline);
    const result = getBaseline();
    expect(result!.completedAt).toBeDefined();
    expect(new Date(result!.completedAt!).getTime()).not.toBeNaN();
  });

  it('TC-U010c: getBaseline returns null when nothing has been saved', () => {
    expect(getBaseline()).toBeNull();
  });

  it('TC-U010d: overwriting baseline replaces all previous values', () => {
    saveBaseline(sampleBaseline);
    saveBaseline({ ...sampleBaseline, teamStressLevel: 2 });
    expect(getBaseline()!.teamStressLevel).toBe(2);
  });
});

describe('storage – saveGoals / getGoals (TC-U011)', () => {
  beforeEach(() => {
    clearAllData();
    vi.clearAllMocks();
  });

  // TC-U011: all 6 goal fields saved and retrieved correctly
  it('TC-U011a: saves all 6 goal fields and reads them back intact', () => {
    saveGoals(sampleGoals);
    const result = getGoals();

    expect(result).not.toBeNull();
    expect(result!.stressReduction).toBe('Reduce team stress by 30%');
    expect(result!.productivityGoal).toBe('Ship features 20% faster');
    expect(result!.communicationGoal).toBe('Daily stand-ups with clear agenda');
    expect(result!.personalGoal).toBe('Meditate 10 minutes daily');
    expect(result!.teamGoal).toBe('Build psychological safety');
    expect(result!.successMetrics).toBe('Monthly eNPS score');
  });

  it('TC-U011b: saved goals include a completedAt timestamp', () => {
    saveGoals(sampleGoals);
    const result = getGoals();
    expect(result!.completedAt).toBeDefined();
  });

  it('TC-U011c: getGoals returns null when nothing has been saved', () => {
    expect(getGoals()).toBeNull();
  });
});

describe('storage – completeModule / getProgress (TC-U012)', () => {
  beforeEach(() => {
    clearAllData();
    vi.clearAllMocks();
  });

  // TC-U012: completing a module adds it to completedModules
  it('TC-U012a: completeModule adds the module ID to completedModules', () => {
    completeModule(1);
    const progress = getProgress();
    expect(progress.completedModules).toContain(1);
  });

  it('TC-U012b: completing module 1 sets currentModule to 2', () => {
    completeModule(1);
    expect(getProgress().currentModule).toBe(2);
  });

  it('TC-U012c: completing multiple modules keeps completedModules sorted', () => {
    completeModule(1);
    completeModule(2);
    completeModule(3);
    const { completedModules } = getProgress();
    expect(completedModules).toEqual([1, 2, 3]);
    expect(completedModules).toEqual([...completedModules].sort((a, b) => a - b));
  });

  it('TC-U012d: completing the same module twice does not duplicate it', () => {
    completeModule(1);
    completeModule(1);
    const { completedModules } = getProgress();
    expect(completedModules.filter((m) => m === 1).length).toBe(1);
  });

  it('TC-U012e: isModuleCompleted returns true after completion', () => {
    completeModule(2);
    expect(isModuleCompleted(2)).toBe(true);
  });

  it('TC-U012f: isModuleCompleted returns false for an untouched module', () => {
    expect(isModuleCompleted(5)).toBe(false);
  });

  it('TC-U012g: saveProgress and getProgress round-trip correctly', () => {
    saveProgress({ completedModules: [1, 2], currentModule: 3 });
    const p = getProgress();
    expect(p.completedModules).toEqual([1, 2]);
    expect(p.currentModule).toBe(3);
  });

  it('TC-U012h: getProgress returns defaults when nothing is saved', () => {
    const p = getProgress();
    expect(p.completedModules).toEqual([]);
    expect(p.currentModule).toBe(1);
  });
});
