import { Server } from 'socket.io';
import { ClientInfo } from 'whatsapp-web.js';
import { Message } from '../entities/message.entity';

export interface WhatsappService {
  sendMsg({ message, phone }: Message): Promise<any>;
  getUser(): any;
}
