import { Service } from 'typedi';
import { WhatsappWebClient } from '../../../shared/infrastructure/clients/whatsapp_web_client';
import { Message, WhatsappService } from '../../domain';

@Service('WhatsappService')
export class WhatsappWebService extends WhatsappWebClient implements WhatsappService {
  async sendMsg(lead: Message): Promise<any> {
    try {
      if (!this.client.info) return Promise.resolve({ error: 'WAIT_LOGIN' });
      const { message, phone } = lead;
      const response = await this.client.sendMessage(`${phone}@c.us`, message);
      console.log(response);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  getUser() {
    return {};
  }

  async logout() {
    await this.client.logout();
  }
}
