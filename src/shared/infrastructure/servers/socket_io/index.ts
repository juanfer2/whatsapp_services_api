import { Server, Socket } from 'socket.io';
import { WhatsappService } from '../../../../whatsapp/domain';
import { WPService } from '../../../../whatsapp/infrastructure/repositories';
import { WhatsappWebClient } from '../../clients/whatsapp_web_client';

export class SocketIO {
  io: Server;
  whatsappClient: WhatsappWebClient;

  constructor(io: Server, whatsappClient: WhatsappWebClient) {
    this.io = io;
    this.whatsappClient = whatsappClient;
  }

  async start() {
    this.io.on('connection', (socket: Socket) => {
      console.log('Socket connection open...');
      this.whatsappClient.start(this.io);
      this.whatsappClient.connect(this.io);
      this.whatsappClient.getQr(this.io);
      // socket.on('update-qr', data => {
      //   console.log('data_from_socket', data);
      //   this.io.emit('emit-update-qr', data);
      // });
    });
  }
}
