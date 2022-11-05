import { WhatsAppMessageMapper } from "./whatsapp_message.mapper";

export interface WhatsappMessageRepository {
  save(data: WhatsAppMessageMapper): any;
  all(): any
  find(data: WhatsAppMessageMapper): any;
}
