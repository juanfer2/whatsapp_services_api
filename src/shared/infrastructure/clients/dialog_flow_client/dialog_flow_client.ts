import dialogFlow, { SessionsClient } from '@google-cloud/dialogflow';
import fs from 'fs';
import crypto from 'crypto';
import { DialogFlowAccount } from './dialog_flow_account';

const KEEP_DIALOG_FLOW = 'true';

export class DialogFlowClient {
  sessionClient: SessionsClient;
  // dialogFlowAccount: DialogFlowAccount;
  // keep_dialog_flow = true;

  constructor(sessionClient: SessionsClient) {
    this.sessionClient = sessionClient;
  }
}
