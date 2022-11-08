import { Server } from 'socket.io';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { WhatsappWebClientFactory } from './whastapp_web_client_factory';
import qrcode from 'qrcode-terminal';
import { image as imageQr } from 'qr-image';
import { v4 as uuid } from 'uuid';

enum STATUS_LOGIN {
  PENDING = 'PENDING',
  QR = 'QR',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export class WhatsappWebClient {
  client: Client;
  statusLogin: STATUS_LOGIN;
  qr = 'qr.svg';

  constructor() {
    this.client = WhatsappWebClientFactory.createClient('startConnection', {
      authStrategy: new LocalAuth({ clientId: 'ayenda' }),
      puppeteer: { headless: true }
    });

    this.statusLogin = STATUS_LOGIN.PENDING;
  }

  start(io: Server) {
    console.log('Inicializando...');
    this.client.initialize();

    this.client.on('authenticated', () => {
      console.log('authenticated');
    });

    this.client.on('message', message => {
      console.log('message');
      console.log(message);
      console.log('message.body');
      console.log(message.body);
    });

    this.client.on('auth_failure', () => {
      console.log('LOGIN_FAIL');
    });

    this.client.on('qr', qr => {
      this.statusLogin = STATUS_LOGIN.QR;
      console.log('Escanea el codigo QR que esta en la carepta tmp');
      this.generateImage(qr, io);
      qrcode.generate(qr, { small: true });
    });
  }

  connect(io: Server) {
    console.log(this.client.info);

    if (this.client.info) {
      this.updateSuccesLogin(io);
    } else {
      this.client.on('ready', () => {
        console.log('LOGIN_SUCCESS');
        this.updateSuccesLogin(io);
      });
    }
  }

  getQr(io: Server) {
    if (!this.client.info) {
      io.emit('updateQr', this.qr);
    }
  }

  private generateImage = (base64: string, io: Server) => {
    const path = `${process.cwd()}/tmp/qrs`;
    let qr_svg = imageQr(base64, { type: 'svg', margin: 4 });
    const nameQr = uuid();
    this.qr = `${nameQr}.svg`;
    // this.qr = `qr.svg`;
    const imgUrl = `${path}/${nameQr}.svg`;
    qr_svg.pipe(require('fs').createWriteStream(imgUrl));
    io.emit('updateQr', this.qr);
    console.log(this.qr);
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };

  private updateSuccesLogin(io: Server) {
    this.statusLogin = STATUS_LOGIN.SUCCESS;
    io.emit('statusLogin', this.statusLogin);
    io.emit('login', this.client.info);
  }
}
