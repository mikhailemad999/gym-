import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RecoveryService } from './recovery.service';
import { Repository } from 'typeorm';
import { RecoveryLog } from './entities/recovery-log.entity';
import { HydrationLog } from './entities/hydration-log.entity';

describe('RecoveryService', () => {
  let service: RecoveryService;
  let recoveryRepo: Partial<Repository<RecoveryLog>>;
  let hydrationRepo: Partial<Repository<HydrationLog>>;

  beforeEach(() => {
    recoveryRepo = {
      findOne: vi.fn(),
      create: vi.fn((entity) => entity as RecoveryLog),
      save: vi.fn((entity) => Promise.resolve(entity as RecoveryLog)),
      find: vi.fn().mockResolvedValue([]),
    };

    hydrationRepo = {
      findOne: vi.fn(),
      create: vi.fn((entity) => entity as HydrationLog),
      save: vi.fn((entity) => Promise.resolve(entity as HydrationLog)),
    };

    service = new RecoveryService(
      recoveryRepo as Repository<RecoveryLog>,
      hydrationRepo as Repository<HydrationLog>,
    );
  });

  it('should calculate optimal physiological readiness when metrics are high', () => {
    const result = service.calculatePhysiologicalReadiness({
      sleepHours: 8.5,
      sleepQuality: 92,
      restingHeartRate: 50,
      hrvRmssd: 75,
      sorenessScore: 2,
      stressScore: 2,
      energyScore: 9,
    });

    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.state).toBe('OPTIMAL');
    expect(result.insight).toContain('parasympathetic');
  });

  it('should flag strained state when sleep is deficient and soreness is high', () => {
    const result = service.calculatePhysiologicalReadiness({
      sleepHours: 4.5,
      sleepQuality: 50,
      restingHeartRate: 74,
      hrvRmssd: 35,
      sorenessScore: 8,
      stressScore: 7,
      energyScore: 3,
    });

    expect(result.score).toBeLessThan(70);
    expect(['STRAINED', 'CRITICAL']).toContain(result.state);
  });

  it('should return fallback daily telemetry when no log exists yet today', async () => {
    (recoveryRepo.findOne as any).mockResolvedValue(null);

    const log = await service.getDailyRecovery('test-user');
    expect(log).toBeDefined();
    expect(log.userId).toBe('test-user');
    expect(log.readinessScore).toBeGreaterThan(0);
    expect(log.readinessState).toBeDefined();
  });

  it('should log hydration and increment total volume accurately', async () => {
    const existingLog: Partial<HydrationLog> = {
      userId: 'test-user',
      logDate: new Date().toISOString().split('T')[0],
      totalIntakeMl: 1000,
      targetMl: 3500,
      entries: [],
    };
    (hydrationRepo.findOne as any).mockResolvedValue(existingLog);

    const updated = await service.logHydration('test-user', {
      amountMl: 500,
      beverage: 'Electrolyte Water',
    });

    expect(updated.totalIntakeMl).toBe(1500);
    expect(updated.entries?.length).toBe(1);
  });
});
