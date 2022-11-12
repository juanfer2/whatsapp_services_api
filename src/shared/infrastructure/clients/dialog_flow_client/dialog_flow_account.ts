export interface DialogFlowAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export const emptyDialogFlowAccount: DialogFlowAccount = {
  type: '',
  project_id: '',
  private_key_id: '',
  private_key: '',
  client_email: '',
  client_id: '',
  auth_uri: '',
  token_uri: '',
  auth_provider_x509_cert_url: '',
  client_x509_cert_url: ''
};

export interface QueryText {
  text: string;
  languageCode: string;
}

export interface QueryInput {
  text: QueryText;
}

export interface RequestInput {
  session: string;
  queryInput: QueryInput;
}

export interface DataResponseIA {
  replyMessage: string;
  media: any | null;
  trigger: any | null;
}
