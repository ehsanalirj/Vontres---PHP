import KnowledgeBaseArticle from '../models/KnowledgeBaseArticle';

export class KnowledgeBaseService {
  static async searchArticles(query: string): Promise<any[]> {
    return KnowledgeBaseArticle.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
  }

  static async getArticle(id: string): Promise<any> {
    return KnowledgeBaseArticle.findById(id);
  }

  static async createArticle(data: any): Promise<any> {
    const article = new KnowledgeBaseArticle(data);
    return article.save();
  }

  static async updateArticle(id: string, data: any): Promise<any> {
    return KnowledgeBaseArticle.findByIdAndUpdate(id, data, { new: true });
  }
}