import { v4 as uuid } from 'uuid';
import { WhatsappMessage } from '../entities/whtsapp_message.entity';

export class WhatsAppMessageMapper implements WhatsappMessage {
  _id: string;
  id: string;
  message: string;
  from: string;
  to: string;

  constructor({ id, message, to }: { id: string; message: string; to: string }) {
    this._id = uuid();
    this.id = id;
    this.message = message;
    this.from = '3005138128';
    this.to = to;
  }
}
