import { Service } from 'typedi';
import { Message, WhatsappService } from '../../domain';

@Service('WhatsappService.mock')
export class MockWPService implements WhatsappService {
  sendMsg({ message, phone }: Message): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getUser() {
    throw new Error('Method not implemented.');
  }
}
