import { Message, WhatsappService } from "../domain";


export class SendMessageUseCase {
  constructor(
    private readonly whastappService: WhatsappService
  ) {
  }

  async send(message: Message) {
    return await this.whastappService.sendMsg(message);
  }
}
