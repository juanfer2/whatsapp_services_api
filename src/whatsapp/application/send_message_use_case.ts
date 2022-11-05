import { Inject, Service } from 'typedi';
import { Message, WhatsAppMessageMapper, WhatsappService } from '../domain';
import { MongoWhatsappMessageRepository } from '../infrastructure/repositories';
import { TYPES } from '../types';

@Service('SendMessageUseCase')
export class SendMessageUseCase {
  constructor(@Inject('WhatsappService') private readonly whastappService: WhatsappService) {}

  async send(message: Message) {
    const response = await this.whastappService.sendMsg(message);
    const dbMessage = new MongoWhatsappMessageRepository();
    const newMessage = new WhatsAppMessageMapper({ message: message.message, to: message.phone, id: response.id });
    const data = await dbMessage.save(newMessage);

    return data;
  }
}
