import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlan, SubscriptionTier } from './entities/subscription-plan.entity';
import { UserSubscription, UserSubscriptionStatus } from './entities/subscription.entity';
import { SubscribeDto } from './dto/subscribe.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly planRepository: Repository<SubscriptionPlan>,
    @InjectRepository(UserSubscription)
    private readonly subscriptionRepository: Repository<UserSubscription>,
  ) {}

  async getPlans(): Promise<SubscriptionPlan[]> {
    let plans = await this.planRepository.find({ where: { isActive: true } });
    if (plans.length === 0) {
      // Seed default Stitch telemetry plans if empty
      const defaultPlans = [
        {
          name: 'Tier 1 Pro Athlete',
          tier: SubscriptionTier.PRO,
          priceMonthly: 149.0,
          priceAnnual: 1490.0,
          description: 'Full sports telemetry access, real-time workout logging, AI coach recommendations.',
          features: [
            'Continuous Biometric Overload Tracking',
            'Interactive Live Workout HUD with RPE & Rest Clock',
            'Precision Fueling & Micronutrient Diagnostics',
            'Autonomous AI Performance Copilot',
            'Full Dispensary 10% Protocol Discount',
          ],
          isActive: true,
        },
        {
          name: 'Tier 2 Elite Olympian',
          tier: SubscriptionTier.ELITE_OLYMPIAN,
          priceMonthly: 299.0,
          priceAnnual: 2990.0,
          description: 'Direct CSCS coach 1-to-1 video assessments, bespoke mesocycles, blood panel sync.',
          features: [
            'All Tier 1 Pro Features Included',
            'Weekly 1-on-1 Video Sync with CSCS Coach Marcus Vance',
            'Custom Formulated Supplement Stacks',
            'Priority Triage Queue on Telemetry Spikes',
            'Biomechanical Frame-by-Frame Bar Velocity Audits',
          ],
          isActive: true,
        },
        {
          name: 'Coach Diagnostic Pack',
          tier: SubscriptionTier.COACH_PACK,
          priceMonthly: 79.0,
          priceAnnual: null,
          description: 'Single comprehensive biomechanical movement and telemetry audit with coach recommendations.',
          features: [
            'One 45-min Telemetry Calibration Session',
            'DEXA & Compound Overload Velocity Dossier',
            'Mesocycle Restructuring Blueprint',
          ],
          isActive: true,
        },
      ];
      plans = await this.planRepository.save(this.planRepository.create(defaultPlans));
    }
    return plans;
  }

  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    return this.subscriptionRepository.findOne({
      where: { userId, status: UserSubscriptionStatus.ACTIVE },
      relations: { plan: true },
      order: { createdAt: 'DESC' },
    });
  }

  async subscribe(userId: string, dto: SubscribeDto): Promise<UserSubscription> {
    const plan = await this.planRepository.findOne({ where: { id: dto.planId } });
    if (!plan) throw new NotFoundException('Subscription plan not found');

    // Cancel existing active subscription
    const existing = await this.getUserSubscription(userId);
    if (existing) {
      existing.status = UserSubscriptionStatus.CANCELLED;
      await this.subscriptionRepository.save(existing);
    }

    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setDate(now.getDate() + 30);

    const subscription = this.subscriptionRepository.create({
      userId,
      planId: plan.id,
      status: UserSubscriptionStatus.ACTIVE,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
    });

    return this.subscriptionRepository.save(subscription);
  }

  async cancel(userId: string): Promise<UserSubscription> {
    const sub = await this.getUserSubscription(userId);
    if (!sub) throw new NotFoundException('Active subscription not found');
    sub.cancelAtPeriodEnd = true;
    return this.subscriptionRepository.save(sub);
  }
}
