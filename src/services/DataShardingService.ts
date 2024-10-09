import { createHash } from 'crypto';
import { Pool } from 'pg';

export class DataShardingService {
  private shards: Pool[];

  constructor(shardConfigs: any[]) {
    this.shards = shardConfigs.map(config => new Pool(config));
  }

  private getShardIndex(key: string): number {
    const hash = createHash('md5').update(key).digest('hex');
    return parseInt(hash, 16) % this.shards.length;
  }

  async query(key: string, sql: string, params: any[] = []): Promise<any> {
    const shardIndex = this.getShardIndex(key);
    const shard = this.shards[shardIndex];
    return shard.query(sql, params);
  }

  async batchQuery(queries: { key: string; sql: string; params?: any[] }[]): Promise<any[]> {
    const shardQueries = this.shards.map(() => []);
    queries.forEach(query => {
      const shardIndex = this.getShardIndex(query.key);
      shardQueries[shardIndex].push({ sql: query.sql, params: query.params });
    });

    const results = await Promise.all(this.shards.map((shard, index) => {
      return Promise.all(shardQueries[index].map(query => shard.query(query.sql, query.params)));
    }));

    return results.flat();
  }
}