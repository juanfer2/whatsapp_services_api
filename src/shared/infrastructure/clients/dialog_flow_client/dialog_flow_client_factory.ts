import { DialogFlowConfig } from './dialog_flow_config';
import { DialogFlowClient } from './dialog_flow_client';

export class DialogFlowClientFactory {
  static createClient(pathAccount: string) {
    const dialogFlowConfig = new DialogFlowConfig(pathAccount);
    const dialogFlowAccount = dialogFlowConfig.getAccount();
    const sessionClient = dialogFlowConfig.getSession();
    const dialogFlowClient = new DialogFlowClient(sessionClient, dialogFlowAccount);

    return dialogFlowClient;
  }
}
