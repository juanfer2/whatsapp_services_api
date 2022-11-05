import { MongoClient } from "./infrastructure/databases/mongo";
import { Server } from "./server";

const mongoDbURI = 'mongodb://localhost:27017/whatsapp_bot';
const port = process.env.PORT || '4001';
const database = new MongoClient('whatsapp_bot', mongoDbURI);
const server = new Server(port, database);

server.start();
