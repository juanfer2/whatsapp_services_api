import dialogFlow, { SessionsClient, IntentsClient } from '@google-cloud/dialogflow';
import crypto from 'crypto';
import { DataResponseIA, DialogFlowAccount, RequestInput } from './dialog_flow_account';

const KEEP_DIALOG_FLOW = 'true';

export class DialogFlowClient {
  sessionClient: SessionsClient;
  dialogFlowAccount: DialogFlowAccount;
  // keep_dialog_flow = true;

  constructor(sessionClient: SessionsClient, dialogFlowConfig: DialogFlowAccount) {
    this.sessionClient = sessionClient;
    this.dialogFlowAccount = dialogFlowConfig;
  }

  async detectIntent(queryText: any) {
    const request = this.getRequest(queryText);
    const responses = await this.getResponse(request);
    const dataResponse = this.formatResponse(responses);

    return dataResponse;
  }

  async getDataIa(message = '', cb = (rsp: any) => {}) {
    this.detectIntent(message).then(res => {
      cb(res);
    });
  }

  private formatResponse(response: any): DataResponseIA {
    let media = null;
    const [singleResponse] = response;
    const { queryResult } = singleResponse as any;
    const { intent } = (queryResult as any) || ({ intent: {} } as any);
    // const parseIntent = intent['displayName'] || null;
    // console.log(singleResponse);
    const parsePayload = queryResult['fulfillmentMessages'].find(
      (a: any) => a.message === 'payload'
    );

    if (parsePayload && parsePayload.payload) {
      const { fields } = parsePayload.payload;
      media = fields.media.stringValue || null;
    }

    const customPayload = parsePayload ? parsePayload['payload'] : null;

    // console.log('queryResult');
    // console.log(queryResult);

    return {
      replyMessage: queryResult.fulfillmentText,
      media,
      trigger: null
    };
  }

  private async getResponse(request: RequestInput) {
    const responses = await this.sessionClient.detectIntent(request);

    return responses;
  }

  private getRequest(queryText: string): RequestInput {
    const languageCode = 'es';
    const sessionId = KEEP_DIALOG_FLOW ? '1' : crypto.randomUUID();
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      this.dialogFlowAccount.project_id,
      sessionId
    );

    return {
      session: sessionPath,
      queryInput: {
        text: {
          text: queryText,
          languageCode: languageCode
        }
      }
    };
  }

  private async getIntent() {}
}
