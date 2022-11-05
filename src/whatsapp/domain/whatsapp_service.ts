import { Message } from "./message";

export interface WhatsappService {
  sendMsg({message, phone}: Message): Promise<any>
}
