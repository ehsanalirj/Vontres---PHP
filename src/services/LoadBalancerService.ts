import * as http from 'http';
import * as https from 'https';
import { createHash } from 'crypto';

export class LoadBalancerService {
  private servers: string[];
  private healthyServers: Set<string>;

  constructor(servers: string[]) {
    this.servers = servers;
    this.healthyServers = new Set(servers);
    this.startHealthChecks();
  }

  private startHealthChecks() {
    setInterval(() => {
      this.servers.forEach(server => {
        this.checkServerHealth(server);
      });
    }, 5000); // Check every 5 seconds
  }

  private checkServerHealth(server: string) {
    const protocol = server.startsWith('https') ? https : http;
    const req = protocol.get(`${server}/health`, (res) => {
      if (res.statusCode === 200) {
        this.healthyServers.add(server);
      } else {
        this.healthyServers.delete(server);
      }
    });

    req.on('error', () => {
      this.healthyServers.delete(server);
    });
  }

  getServer(key: string): string | null {
    if (this.healthyServers.size === 0) {
      return null;
    }

    const hash = createHash('md5').update(key).digest('hex');
    const serverIndex = parseInt(hash, 16) % this.healthyServers.size;
    return Array.from(this.healthyServers)[serverIndex];
  }
}