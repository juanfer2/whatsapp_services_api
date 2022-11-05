import { Message } from '../entities/message.entity';

export interface WhatsappService {
  sendMsg({ message, phone }: Message): Promise<any>;
}
