import { Inject, Service } from 'typedi';
import { ConversationFlowService } from '../domain';

@Service('FlowConversationUseCase')
export class FlowConversationUseCase {
  constructor(
    @Inject('ConversationFlowService')
    private readonly conversationFlowService: ConversationFlowService
  ) {}

  async responseMsg(message: string) {
    const response = await this.conversationFlowService.responseMsg(message);
    return response;
  }
}
