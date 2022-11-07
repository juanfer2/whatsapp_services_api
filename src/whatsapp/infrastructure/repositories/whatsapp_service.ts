import { LocalAuth, ClientInfo } from 'whatsapp-web.js';
import { image as imageQr } from 'qr-image';
const qrcode = require('qrcode-terminal');
import { WhatsappService, Message } from '../../domain';
import { Client } from 'whatsapp-web.js';
import { Service } from 'typedi';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

enum statusLogin {
  PENDING = 'PENDING',
  QR = 'QR',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

@Service('WhatsappService.wa')
export class WPService extends Client implements WhatsappService {
  private status = false;
  private statusAuth: statusLogin;
  private user: any;
  private io: any;

  constructor(io?: any) {
    super({
      authStrategy: new LocalAuth({ clientId: 'client-one' }),
      puppeteer: { headless: true }
    });

    this.io = io;
    this.statusAuth = statusLogin.PENDING;
    console.log('Inicializando...');

    this.io?.emit('statusLogin', this.statusAuth);
    this.initialize();

    this.on('authenticated', () => {
      console.log('authenticated');
    });

    this.on('message', message => {
      console.log('message');
      console.log(message);
      console.log('message.body');
      console.log(message.body);
    });

    this.on('auth_failure', () => {
      this.status = false;
      this.statusAuth = statusLogin.FAILED;
      console.log('LOGIN_FAIL');
    });

    this.on('qr', qr => {
      this.statusAuth = statusLogin.QR;
      console.log('Escanea el codigo QR que esta en la carepta tmp');
      this.generateImage(qr);
      qrcode.generate(qr, { small: true });
    });
  }

  getStatus(): boolean {
    return this.status;
  }

  async getUser(): Promise<any> {
    return this.status ? this.info : {};
  }

  connect() {
    this.io?.emit('statusLogin', this.statusAuth);

    if (this.status) {
      console.log(this.info);
      this.updateSuccesLogin();
    } else {
      this.on('ready', () => {
        this.status = true;
        this.user = this.info;
        console.log(this.info);
        if (this.io) {
          this.updateSuccesLogin();
        }
        console.log('LOGIN_SUCCESS');
      });
    }
  }

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: 'svg', margin: 4 });
    qr_svg.pipe(require('fs').createWriteStream(`${path}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };

  async sendMsg(lead: { message: string; phone: string }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: 'WAIT_LOGIN' });
      const { message, phone } = lead;
      const response = await this.sendMessage(`${phone}@c.us`, message);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  private updateSuccesLogin() {
    this.statusAuth = statusLogin.SUCCESS;
    this.io?.emit('statusLogin', this.statusAuth);
    this.io?.emit('login', this.info);
  }
}
