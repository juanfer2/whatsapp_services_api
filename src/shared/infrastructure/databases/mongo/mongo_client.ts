import { DatabaseClient } from "../../../domain/database_client";
import { MongoClient as MongoClientConfig } from 'mongodb';
import { MongoClientFactory } from "./mogo_factory_client";

const mongoDbURI = 'mongodb://localhost:27017/whatsapp_bot';

export class MongoClient implements DatabaseClient{
  context: string;
  url: string;

  constructor(context: string, url: string) {
    this.context = context;
    this.url = url;
  }

  async connect() {
    const client = await MongoClientFactory.createClient(this.context, {url: this.url})
    await client.connect();
    console.log('Mongo database connection sucessfully');
    
  }

  async close() {
    const client = await MongoClientFactory.createClient(this.context, {url: this.url})
    await client.close();
    console.log('Mongo database connection is close');
  }
}
