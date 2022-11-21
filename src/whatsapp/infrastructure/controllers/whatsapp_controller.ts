import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import {
  AllMessagesUseCase,
  FlowConversationUseCase,
  GetUserUseCase,
  SendMessageUseCase
} from '../../application';
@Service()
export class WhatsappController {
  constructor(
    @Inject('SendMessageUseCase') private sendMessageUseCase: SendMessageUseCase,
    @Inject('AllMessagesUseCase') private allMessagesUseCase: AllMessagesUseCase,
    @Inject('GetUserUseCase') private getUserUseCase: GetUserUseCase,
    @Inject('FlowConversationUseCase') private flowConversationUseCase: FlowConversationUseCase
  ) {}

  public getInfo = async (_: Request, res: Response) => {
    const user = await this.getUserUseCase.getInfo();

    res.send(user);
  };

  public sendMessage = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const response = await this.sendMessageUseCase.send({ message, phone });

    res.send(response);
  };

  public sendMultipleMessages = async ({ body }: Request, res: Response) => {
    const { message, phones } = body;
    const response = await this.sendMessageUseCase.sendMultiple(phones, message);

    res.send(response);
  };

  public allMessages = async (_: Request, res: Response) => {
    const messages = await this.allMessagesUseCase.getAllMessages();

    res.send(messages);
  };

  public flowConversation = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const messages = await this.flowConversationUseCase.responseMsg(message);

    res.send(messages);
  };
}
