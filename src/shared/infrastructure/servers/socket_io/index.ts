import { Server, Socket } from 'socket.io';
import { WhatsappService } from '../../../../whatsapp/domain';
import { WPService } from '../../../../whatsapp/infrastructure/repositories';

export class SocketIO {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async start() {
    const wp = new WPService(this.io);

    this.io.on('connection', (socket: Socket) => {
      console.log('Socket connection open...');
      wp.connect();
      socket.on('update-qr', data => {
        console.log('data_from_socket', data);
        this.io.emit('emit-update-qr', data);
      });
    });
  }
}
