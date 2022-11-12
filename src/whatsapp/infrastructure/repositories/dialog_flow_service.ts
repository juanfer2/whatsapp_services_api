import { Service } from 'typedi';
import {
  DialogFlowClient,
  DialogFlowClientFactory
} from '../../../shared/infrastructure/clients/dialog_flow_client';
import { ConversationFlowService } from '../../domain';

@Service('ConversationFlowService')
export class DialogFlowService implements ConversationFlowService {
  dialogFlowClient: DialogFlowClient;

  constructor() {
    this.dialogFlowClient = DialogFlowClientFactory.createClient('./chatbot-account.json');
  }

  reply(step: string) {
    new Promise((resolve, reject) => {
      let resData = { replyMessage: '', media: null, trigger: null };
      const responseFind = { replyMessage: [''] };
      resData = {
        ...resData,
        ...responseFind,
        replyMessage: responseFind.replyMessage.join('')
      };
      resolve(resData);
      return;
    });
  }

  responseMsg(message: string) {
    return new Promise((resolve, reject) => {
      let resData = { replyMessage: '', media: null, trigger: null };

      return this.dialogFlowClient.getDataIa(message, dt => {
        resData = { ...resData, ...dt };
        console.log('resData');
        console.log(resData);
        resolve(resData);
      });
    });
  }
}
