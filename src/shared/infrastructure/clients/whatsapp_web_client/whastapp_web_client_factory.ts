import { Client, LocalAuth } from 'whatsapp-web.js';

export class WhatsappWebClientFactory {
  private static clients: { [key: string]: Client } = {};

  static createClient(contextName: string, config: any): Client {
    let client = this.getClient(contextName);

    if (!client) {
      client = this.createEventConnection(config);

      this.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Client | null {
    return this.clients[contextName];
  }

  private static createEventConnection(config: any): Client {
    const client = new Client(config);

    return client;
  }

  private static registerClient(client: Client, contextName: string): void {
    this.clients[contextName] = client;
  }
}
