import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { MongoClientFactory } from '../../../shared/infrastructure/databases/mongo';
import { WhatsAppMessageMapper, WhatsappMessageRepository } from '../../domain';

@Service('WhatsappMessageRepository')
export class MongoWhatsappMessageRepository implements WhatsappMessageRepository {
  async save(data: WhatsAppMessageMapper) {
    const collection = await this.collection();
    const document = { ...data, _id: data._id as any };
    const newData = await collection.insertOne(document);
    const newDocument = await this.find({ _id: newData.insertedId as any });

    console.log(newDocument);

    return newDocument;
  }

  async all() {
    const collection = await this.collection();
    return await collection.find({}).toArray();
  }

  async find(data: Partial<WhatsAppMessageMapper>) {
    const collection = await this.collection();
    const newDocument = await collection.findOne({ ...data });

    return newDocument;
  }

  protected collectionName(): string {
    return 'whatsapp_messages';
  }

  protected async collection(): Promise<Collection> {
    const factory = MongoClientFactory;
    const client: Promise<MongoClient> = factory.createClient('whatsapp_services', {
      url: 'mongodb://localhost:27017/whatsapp_services'
    });
    return (await client).db().collection(this.collectionName());
  }
}
