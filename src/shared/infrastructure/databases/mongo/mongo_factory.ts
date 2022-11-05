import { DatabaseFactory } from "../../../domain/database_factory";

interface MongoDbI {
  uri: string
}

const mongoDbURI = 'mongodb://localhost:27017/whatsapp_bot';

export class MongoFactory implements DatabaseFactory<MongoDbI> {
  createConfig(): MongoDbI {
    return {
      uri: mongoDbURI
    }
  }
}
