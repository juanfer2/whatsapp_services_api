import { MongoClient } from "./infrastructure/databases/mongo";
import { Server } from "./server";

const mongoDbURI = 'mongodb://localhost:27017/whatsapp_services';
const port = process.env.PORT || '4001';
const database = new MongoClient('whatsapp_services', mongoDbURI);
const server = new Server(port, database);

server.start();
