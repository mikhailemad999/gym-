import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachClient } from './entities/coach-client.entity';
import { InterventionLog } from './entities/intervention-log.entity';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(CoachClient)
    private readonly coachClientRepo: Repository<CoachClient>,
    @InjectRepository(InterventionLog)
    private readonly interventionRepo: Repository<InterventionLog>,
  ) {}

  async getRoster(): Promise<CoachClient[]> {
    const roster = await this.coachClientRepo.find({
      relations: { client: true },
      order: { adherenceScore: 'DESC' },
    });

    if (roster.length === 0) {
      // Return default initial list matching Stitch roster
      return [
        {
          id: '1',
          coachId: 'coach-1',
          clientId: 'client-1',
          tier: 'Tier 1 Pro',
          discipline: 'Strength',
          currentPhase: 'Hypertrophy II',
          microcycle: 'Week 09 / Day 03',
          adherenceScore: 96,
          cnsStatus: 'OPTIMAL (1.04)',
          cnsRatio: 1.04,
          needsReview: true,
          lastTelemetry: 'Today, 08:42',
          lastTelemetryDetail: 'Push Session B (RPE 9.0)',
          createdAt: new Date(),
          updatedAt: new Date(),
          coach: null as any,
          client: {
            id: 'client-1',
            firstName: 'Mikhail',
            lastName: 'R.',
            fullName: 'Mikhail R.',
            profilePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZtGJiiqobiwUxnOvl_x71hRaQgrg29WD7aRq7vf2OnS2uJfcEfF7iV6_90uwHVVUl9nGym1Tkn3fbZaEr__qfEE66WyDxqb6d1uOoKHM0VA_tGQ7pThBe3yU3dYOYPFYMVFGXzAq8TpL7Iv3EvCFIsiMOdsOe9d5hKKzXWzpDXRjYOO1A88pnoJ8uW4FBoGjBwhY8UjFEMDx5yw8nuanzYF_nG9Y-F4LLu0vgjY0Kw9w5CvhXPYi8',
          } as any,
        },
        {
          id: '2',
          coachId: 'coach-1',
          clientId: 'client-2',
          tier: 'Tier 1 Pro',
          discipline: 'Endurance',
          currentPhase: 'Marathon Peak',
          microcycle: 'Week 14 / Taper Prep',
          adherenceScore: 91,
          cnsStatus: 'OVERLOADED (1.42)',
          cnsRatio: 1.42,
          needsReview: true,
          lastTelemetry: 'Today, 06:15',
          lastTelemetryDetail: 'Biometrics • HRV Down',
          createdAt: new Date(),
          updatedAt: new Date(),
          coach: null as any,
          client: {
            id: 'client-2',
            firstName: 'Sarah',
            lastName: 'Jenkins',
            fullName: 'Sarah Jenkins',
            profilePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_5-v6GLLbGTriYATFYuuwd0PelYRXCUG_Pn5a6gy2yeyNsy5jJ9jjyx59LSOdkHbXMkIvSsgbDoJaPciAhPgX1qOnXbhx132Oj0sfKYDqbqwlvhpyBfH4RnKB1HJF64z-dSRtGihiK4PZUqhD7rYSaDas1IaL0tyt9y6F4otVZVjm2Zmtxgf791UH8sJ1C54uUCBJIQq46ZZwE3K1neMLqUreizqCuRa2HWam_xTmajDnPJSJVzsi',
          } as any,
        },
        {
          id: '3',
          coachId: 'coach-1',
          clientId: 'client-3',
          tier: 'Senior Athlete',
          discipline: 'Olympic Lifting',
          currentPhase: 'Clean & Jerk Peaking',
          microcycle: 'Week 08 / Deload Due',
          adherenceScore: 78,
          cnsStatus: 'CNS FATIGUE',
          cnsRatio: 1.55,
          needsReview: true,
          lastTelemetry: '2 Days Ago',
          lastTelemetryDetail: 'Missing Check-in',
          createdAt: new Date(),
          updatedAt: new Date(),
          coach: null as any,
          client: {
            id: 'client-3',
            firstName: 'David',
            lastName: 'Zhao',
            fullName: 'David Zhao',
            profilePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvfXwRwV9SR5STMqRd4YvjfmAIc2j4mYvE9ZRtQBoBcsYebr-U6oY4Zp--ZZwP80985peZtVLJzabAWVM0H6bSZlwtiE8B9CkhzCcTaqF4P_H62uHQ-58VDqz2jFUUsaO6cgzZRyxpHLuzjo7csaCBctOzCRmtC0gF21N6jNYo5Dsa5i6V6QK5T9Y4zBcXSGNlK6kG1N54zJn1RsIlm0Tft3yuilXp8zCqVK-lCzfFlcb9zNQJRQIK',
          } as any,
        },
      ];
    }

    return roster;
  }

  async recordIntervention(coachId: string, clientId: string, actionType: string, summary: string): Promise<InterventionLog> {
    const log = this.interventionRepo.create({
      coachId,
      clientId,
      actionType,
      summary,
      status: 'applied',
    });
    return this.interventionRepo.save(log);
  }

  async getKpiMetrics() {
    return {
      activeAthletes: { current: 28, capacity: 30, percentage: 93.3 },
      criticalTriage: { count: 3, description: 'HRV Spike / Missed Check-in' },
      avgAdherence: { percentage: 94.2, diff: '+1.8%' },
      sessionsToday: { count: 5, nextAthlete: 'Mikhail R. (24m)' },
      unreadTelemetry: { count: 4, detail: '2 Biomech / 2 Blood Biomarkers' },
    };
  }
}
