import { SessionsClient } from '@google-cloud/dialogflow';
import { DialogFlowAccount, emptyDialogFlowAccount } from './dialog_flow_account';
import fs from 'fs';
// import crypto from 'crypto';

export class DialogFlowConfig {
  configPath: string;

  constructor(configPath: string) {
    this.configPath = configPath;
  }

  getSession(): SessionsClient {
    const account = this.getAccount();
    const credentials = { private_key: account.private_key, client_email: account.client_email };

    return new SessionsClient({ credentials });
  }

  getAccount(): DialogFlowAccount {
    if (!this.checkPathCredentials()) return emptyDialogFlowAccount;
    const credentialsAccount = this.parseCredentials();

    return {
      type: credentialsAccount['type'],
      project_id: credentialsAccount['project_id'],
      private_key_id: credentialsAccount['private_key_id'],
      private_key: credentialsAccount['private_key'],
      client_email: credentialsAccount['client_email'],
      client_id: credentialsAccount['client_id'],
      auth_uri: credentialsAccount['auth_uri'],
      token_uri: credentialsAccount['token_uri'],
      auth_provider_x509_cert_url: credentialsAccount['auth_provider_x509_cert_url'],
      client_x509_cert_url: credentialsAccount['client_x509_cert_url']
    };
  }

  private parseCredentials() {
    return JSON.parse(fs.readFileSync(`${this.configPath}`) as any);
  }

  private checkPathCredentials() {
    // return !fs.existsSync(this.configPath) ? true : false;
    return !fs.existsSync(`${__dirname}/../../../../chatbot-account.json`) ? true : false;
  }
}
