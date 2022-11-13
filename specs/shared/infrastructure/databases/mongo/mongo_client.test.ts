import MongoClientFactory from '../../../../../src/shared/infrastructure/databases/mongo/mongo_factory_client';

import { MongoClient } from '../../../../../src/shared/infrastructure/databases/mongo';

/*
const mockMongoClientFactoryFn = jest.fn().mockReturnValue({ connect: jest.fn() });

jest.mock('../../../../../src/shared/infrastructure/databases/mongo/mongo_factory_client', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createClient: (context: string, settings: any) => {
        return 'connect()';
      }
    };
  });
});
*/

describe('MongoClient', () => {
  let mongoClient: MongoClient;
  let closeConection = jest.fn();
  let openConection = jest.fn();
  let mockFunctions = { connect: openConection, close: closeConection };
  let mockStaticMethod = jest.fn().mockReturnValue(mockFunctions);

  beforeEach(async () => {
    MongoClientFactory.createClient = mockStaticMethod;
    mongoClient = new MongoClient('test', 'mongodb://localhost:27017/mooc-backend-test1');
  });

  describe('connect', () => {
    it('calls singleton instances for open connexion', async () => {
      await mongoClient.connect();
      expect(mockStaticMethod).toHaveBeenCalledTimes(1);
      expect(openConection).toHaveBeenCalledTimes(1);
    });
  });

  describe('close', () => {
    it('calls singleton instances for close connexion', async () => {
      await mongoClient.close();
      expect(mockStaticMethod).toHaveBeenCalledTimes(1);
      expect(closeConection).toHaveBeenCalledTimes(1);
    });
  });
});
