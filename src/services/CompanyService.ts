import Company, { ICompany } from '../models/Company';

export class CompanyService {
  static async createCompany(companyData: Partial<ICompany>): Promise<ICompany> {
    const { tier, ...rest } = companyData;
    const features = this.getFeaturesForTier(tier);
    const maxAgents = this.getMaxAgentsForTier(tier);

    const company = new Company({
      ...rest,
      tier,
      features,
      maxAgents,
    });

    return await company.save();
  }

  private static getFeaturesForTier(tier: string): string[] {
    const baseFeatures = ['basic_calling', 'basic_reporting'];
    switch (tier) {
      case 'single':
        return [...baseFeatures, 'simple_crm'];
      case 'small':
        return [...baseFeatures, 'simple_crm', 'basic_ai_assistance', 'team_chat'];
      case 'large':
        return [...baseFeatures, 'advanced_crm', 'ai_assistance', 'team_chat', 'quality_assurance', 'advanced_analytics'];
      case 'enterprise':
        return [...baseFeatures, 'advanced_crm', 'ai_assistance', 'team_chat', 'quality_assurance', 'advanced_analytics', 'custom_integrations', 'dedicated_support'];
      default:
        return baseFeatures;
    }
  }

  private static getMaxAgentsForTier(tier: string): number {
    switch (tier) {
      case 'single': return 1;
      case 'small': return 20;
      case 'large': return 500;
      case 'enterprise': return Infinity;
      default: return 0;
    }
  }

  static async getCompanyFeatures(companyId: string): Promise<string[]> {
    const company = await Company.findById(companyId);
    return company ? company.features : [];
  }
}