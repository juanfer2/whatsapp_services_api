import { Inject, Service } from 'typedi';
import { ConversationFlowService } from '../domain';

@Service('FlowConversationUseCase')
export class FlowConversationUseCase {
  constructor(@Inject('ConversationFlowService') private readonly conversationFlowService: ConversationFlowService) {}

  async responseMsg() {
    const rsp = await this.conversationFlowService.responseMsg();
    return rsp;
  }
}
