import { Message } from "./message.entity";

export interface WhatsappService {
  sendMsg({message, phone}: Message): Promise<any>
}
