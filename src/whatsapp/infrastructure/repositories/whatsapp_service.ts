import { Client, LocalAuth, NoAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
const qrcode = require('qrcode-terminal');
import { WhatsappService, Message } from "../../domain";

export class WPService extends Client implements WhatsappService {
  private status = false;

  constructor() {
    super({
      authStrategy: new LocalAuth({ clientId: "client-one" }),
      puppeteer: { headless: true }
    })

    console.log('Inicializando...');
    this.initialize();

    this.on('ready', () => {
      this.status = true;
      console.log('LOGIN_SUCCESS');
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("LOGIN_FAIL");
    });

    this.on("qr", (qr) => {
      console.log('Escanea el codigo QR que esta en la carepta tmp')
      // console.log('QR RECEIVED', qr);
      qrcode.generate(qr, {small: true});
      this.generateImage(qr)
    });
    
  }


  getStatus(): boolean {
    return this.status;
  }

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };

  async sendMsg(lead: { message: string; phone: string }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const { message, phone } = lead;
      const response = await this.sendMessage(`${phone}@c.us`, message);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }
}
