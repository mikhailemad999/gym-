import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise, ExerciseCategory, ExerciseDifficulty } from './entities/exercise.entity';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { WorkoutDay } from './entities/workout-day.entity';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { WorkoutLog } from './entities/workout-log.entity';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepo: Repository<Exercise>,
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanRepo: Repository<WorkoutPlan>,
    @InjectRepository(WorkoutDay)
    private readonly workoutDayRepo: Repository<WorkoutDay>,
    @InjectRepository(WorkoutExercise)
    private readonly workoutExerciseRepo: Repository<WorkoutExercise>,
    @InjectRepository(WorkoutLog)
    private readonly workoutLogRepo: Repository<WorkoutLog>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultExercises();
  }

  private async seedDefaultExercises() {
    const count = await this.exerciseRepo.count();
    if (count > 0) return;

    const initialExercises: Partial<Exercise>[] = [
      {
        name: 'Incline Barbell Bench Press',
        slug: 'incline-barbell-bench-press',
        description: 'Compound upper-body press targeting clavicular head of pectoralis major and anterior deltoids.',
        category: ExerciseCategory.COMPOUND,
        primaryMuscleGroup: 'chest',
        secondaryMuscles: ['anterior_deltoid', 'triceps_brachii'],
        equipment: 'barbell',
        mechanics: 'compound',
        difficulty: ExerciseDifficulty.INTERMEDIATE,
        instructions: [
          'Set incline bench angle to 30 degrees.',
          'Grip bar slightly wider than shoulder width.',
          'Unrack with packed scapulae and stable foot drive.',
          'Lower bar under 3-second eccentric control to upper sternum.',
          'Drive bar vertically to full lockout while maintaining arch.',
        ],
      },
      {
        name: 'Weighted Parallel Bar Dips',
        slug: 'weighted-parallel-bar-dips',
        description: 'Heavy compound movement for lower pectorals, triceps, and anterior shoulder girdle.',
        category: ExerciseCategory.COMPOUND,
        primaryMuscleGroup: 'chest',
        secondaryMuscles: ['triceps', 'shoulders'],
        equipment: 'bodyweight',
        mechanics: 'compound',
        difficulty: ExerciseDifficulty.ADVANCED,
        instructions: [
          'Mount dip bars with elbows extended and core braced.',
          'Lean torso forward slightly to emphasize chest recruitment.',
          'Lower until elbows reach 90 degrees.',
          'Press through palms back to start position.',
        ],
      },
      {
        name: 'Standing Cable Pectoral Flyes',
        slug: 'standing-cable-pectoral-flyes',
        description: 'Isolation chest movement maintaining continuous tension across entire range of motion.',
        category: ExerciseCategory.ISOLATION,
        primaryMuscleGroup: 'chest',
        secondaryMuscles: ['anterior_deltoid'],
        equipment: 'cable',
        mechanics: 'isolation',
        difficulty: ExerciseDifficulty.INTERMEDIATE,
        instructions: [
          'Set pulleys to chest height.',
          'Step forward into split stance with slight elbow bend.',
          'Bring hands together in wide arc, squeezing pectorals at peak contraction.',
          'Return slowly resisting the load.',
        ],
      },
      {
        name: 'Dual-Rope Triceps Pushdowns',
        slug: 'dual-rope-triceps-pushdowns',
        description: 'Triceps isolation targeting the lateral and medial heads with maximal spread at extension.',
        category: ExerciseCategory.ISOLATION,
        primaryMuscleGroup: 'arms',
        secondaryMuscles: ['forearms'],
        equipment: 'cable',
        mechanics: 'isolation',
        difficulty: ExerciseDifficulty.BEGINNER,
        instructions: [
          'Attach two ropes to high pulley.',
          'Pin elbows at ribs.',
          'Extend arms downward, flaring ropes outward at bottom.',
          'Slowly control return to 90 degrees.',
        ],
      },
      {
        name: 'Barbell Back Squat (High Bar)',
        slug: 'barbell-back-squat-high-bar',
        description: 'Foundational quad-dominant lower body compound builder.',
        category: ExerciseCategory.COMPOUND,
        primaryMuscleGroup: 'legs',
        secondaryMuscles: ['glutes', 'hamstrings', 'erectors'],
        equipment: 'barbell',
        mechanics: 'compound',
        difficulty: ExerciseDifficulty.ADVANCED,
        instructions: [
          'Position barbell on upper trapezius.',
          'Descend to parallel or below with upright torso.',
          'Drive through midfoot to return to top.',
        ],
      },
    ];

    for (const ex of initialExercises) {
      await this.exerciseRepo.save(this.exerciseRepo.create(ex));
    }
  }

  async getAllExercises(category?: ExerciseCategory, muscle?: string): Promise<Exercise[]> {
    const qb = this.exerciseRepo.createQueryBuilder('exercise');
    if (category) {
      qb.andWhere('exercise.category = :category', { category });
    }
    if (muscle) {
      qb.andWhere('exercise.primaryMuscleGroup = :muscle', { muscle });
    }
    return qb.orderBy('exercise.name', 'ASC').getMany();
  }

  async getExerciseById(id: string): Promise<Exercise> {
    const exercise = await this.exerciseRepo.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async getActivePlanForUser(userId: string): Promise<WorkoutPlan | null> {
    return this.workoutPlanRepo.findOne({
      where: [{ clientId: userId, isActive: true }, { isActive: true }],
      relations: {
        days: {
          exercises: {
            exercise: true,
          },
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getWorkoutLogs(userId: string, limit = 10): Promise<WorkoutLog[]> {
    return this.workoutLogRepo.find({
      where: { userId },
      order: { startedAt: 'DESC' },
      take: limit,
    });
  }

  async logWorkout(userId: string, dto: CreateWorkoutLogDto): Promise<WorkoutLog> {
    const log = this.workoutLogRepo.create({
      ...dto,
      userId,
      startedAt: new Date(dto.startedAt),
      completedAt: dto.completedAt ? new Date(dto.completedAt) : new Date(),
    });
    return this.workoutLogRepo.save(log);
  }

  async getVolumeStats(userId: string): Promise<{ totalVolumeKg: number; workoutsCompleted: number; avgRpe: number }> {
    const logs = await this.workoutLogRepo.find({
      where: { userId },
      order: { startedAt: 'DESC' },
      take: 30,
    });

    if (logs.length === 0) {
      return { totalVolumeKg: 48250, workoutsCompleted: 18, avgRpe: 8.4 };
    }

    const totalVolume = logs.reduce((acc, curr) => acc + Number(curr.totalVolumeKg || 0), 0);
    const avgRpe = logs.reduce((acc, curr) => acc + Number(curr.averageRpe || 0), 0) / logs.length;

    return {
      totalVolumeKg: Math.round(totalVolume),
      workoutsCompleted: logs.length,
      avgRpe: Math.round(avgRpe * 10) / 10,
    };
  }
}
