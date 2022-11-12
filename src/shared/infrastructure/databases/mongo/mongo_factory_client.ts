import { Logger, MongoClient } from 'mongodb';

export class MongoClientFactory {
  private static clients: { [key: string]: MongoClient } = {};

  static async createClient(contextName: string, config: any): Promise<MongoClient> {
    let client = this.getClient(contextName);

    if (!client) {
      client = await this.createAndConnectClient(config);

      this.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): MongoClient | null {
    return this.clients[contextName];
  }

  private static async createAndConnectClient(config: any): Promise<MongoClient> {
    const client = new MongoClient(config.url, { ignoreUndefined: true });
    Logger.setLevel('debug');

    await client.connect();

    return client;
  }

  private static registerClient(client: MongoClient, contextName: string): void {
    this.clients[contextName] = client;
  }
}

export default MongoClientFactory;
