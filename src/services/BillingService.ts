import Subscription from '../models/Subscription';
import Company from '../models/Company';
import { sendEmail } from './EmailService';

export class BillingService {
  static async createSubscription(companyId: string, plan: 'basic' | 'pro' | 'enterprise', paymentMethod: string): Promise<void> {
    const startDate = new Date();
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

    const subscription = new Subscription({
      company: companyId,
      plan,
      startDate,
      endDate,
      paymentMethod,
      nextBillingDate: endDate
    });

    await subscription.save();
  }

  static async renewSubscription(subscriptionId: string): Promise<void> {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.startDate = new Date();
    subscription.endDate = new Date(subscription.startDate.getFullYear(), subscription.startDate.getMonth() + 1, subscription.startDate.getDate());
    subscription.nextBillingDate = subscription.endDate;
    subscription.status = 'active';

    await subscription.save();
  }

  static async cancelSubscription(subscriptionId: string): Promise<void> {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = 'cancelled';
    await subscription.save();
  }

  static async checkExpiringSubscriptions(): Promise<void> {
    const expiringDate = new Date();
    expiringDate.setDate(expiringDate.getDate() + 7); // Check subscriptions expiring in 7 days

    const expiringSubscriptions = await Subscription.find({
      status: 'active',
      endDate: { $lte: expiringDate }
    }).populate('company');

    for (const subscription of expiringSubscriptions) {
      const company = subscription.company as any;
      await sendEmail(
        company.email,
        'Subscription Expiring Soon',
        `Your subscription for ${company.name} is expiring on ${subscription.endDate.toDateString()}. Please renew to avoid service interruption.`
      );
    }
  }
}