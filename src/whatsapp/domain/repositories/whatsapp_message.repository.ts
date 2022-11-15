import { WhatsAppMessageMapper } from '../mappers/whatsapp_message.mapper';

export interface WhatsappMessageRepository {
  save(data: Partial<WhatsAppMessageMapper>): any;
  all(): any;
  find(data: WhatsAppMessageMapper): any;
}
