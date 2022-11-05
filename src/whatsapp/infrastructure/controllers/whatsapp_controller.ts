import { Request, Response } from 'express';
import { SendMessageUseCase } from '../../application/send_message_use_case';
import { MongoWhatsappMessageRepository } from '../repositories';

export class whatsappController {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) {}

  public sendMessage = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const response = await this.sendMessageUseCase.send({message, phone});

    res.send(response);
  }

  public allMessages = async (_: Request, res: Response) => {
    const mongoDb = new MongoWhatsappMessageRepository();
    const response = await mongoDb.all();

    res.send(response);
  }
}
