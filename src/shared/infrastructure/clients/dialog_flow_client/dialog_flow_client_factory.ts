import dialogFlow, { SessionsClient } from '@google-cloud/dialogflow';
import fs from 'fs';
import crypto from 'crypto';
import { DialogFlowAccount } from './dialog_flow_account';
import { DialogFlowConfig } from './dialog_flow_config';
import { DialogFlowClient } from './dialog_flow_client';

const KEEP_DIALOG_FLOW = 'true';

export class DialogFlowClientFactory {
  // pathAccount: string;
  // dialogFlowAccount: DialogFlowAccount;
  // keep_dialog_flow = true;

  static createClient(pathAccount: string) {
    const dialogFlowConfig = new DialogFlowConfig(pathAccount);
    console.log(dialogFlowConfig);
    const sessionClient = dialogFlowConfig.getSession();
    console.log(dialogFlowConfig.getAccount());
    const dialogFlowClient = new DialogFlowClient(sessionClient);

    return dialogFlowClient;
  }
}
