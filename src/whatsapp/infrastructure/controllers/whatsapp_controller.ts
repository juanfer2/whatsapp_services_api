import { Request, Response } from 'express';
import { AllMessagesUseCase, SendMessageUseCase } from '../../application';
import { Inject, Service } from 'typedi';
@Service()
export class WhatsappController {
  constructor(
    @Inject('SendMessageUseCase') private sendMessageUseCase: SendMessageUseCase,
    @Inject('AllMessagesUseCase') private allMessagesUseCase: AllMessagesUseCase
  ) {}

  public sendMessage = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const response = await this.sendMessageUseCase.send({ message, phone });

    res.send(response);
  };

  public allMessages = async (_: Request, res: Response) => {
    const messages = await this.allMessagesUseCase.getAllMessages();

    res.send(messages);
  };
}
