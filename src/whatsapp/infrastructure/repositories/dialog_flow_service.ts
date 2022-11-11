import { Service } from 'typedi';
import { DialogFlowClient, DialogFlowClientFactory } from '../../../shared/infrastructure/clients/dialog_flow_client';
import { ConversationFlowService } from '../../domain';

@Service('ConversationFlowService')
export class DialogFlowService implements ConversationFlowService {
  dialogFlowClient: DialogFlowClient;

  constructor() {
    this.dialogFlowClient = DialogFlowClientFactory.createClient('./chatbot-account.json');
  }

  responseMsg() {
    return this.dialogFlowClient.sessionClient;
  }
}
