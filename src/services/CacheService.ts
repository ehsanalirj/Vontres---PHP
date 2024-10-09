import Redis from 'ioredis';

export class CacheService {
  private redisClient: Redis.Cluster;

  constructor() {
    this.redisClient = new Redis.Cluster([
      {
        port: 6380,
        host: "redis-node-1",
      },
      {
        port: 6380,
        host: "redis-node-2",
      },
      {
        port: 6380,
        host: "redis-node-3",
      },
    ]);
  }

  async set(key: string, value: any, expiration?: number): Promise<void> {
    if (expiration) {
      await this.redisClient.set(key, JSON.stringify(value), 'EX', expiration);
    } else {
      await this.redisClient.set(key, JSON.stringify(value));
    }
  }

  async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async flush(): Promise<void> {
    await this.redisClient.flushall();
  }
}