import express from 'express';
import * as http from 'http';
import { whatsappRoutes } from '../../whatsapp';
import app from '../app';
import { DatabaseClient } from '../domain/database_client';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;
  private dbClient?: DatabaseClient; 

  constructor(port: string, dbClient?: DatabaseClient) {
    this.port = port;
    this.express = app;
    this.dbClient = dbClient;
  }

  async start(): Promise<void> {
    return new Promise(resolve => {
      this.dbClient?.connect().then(() => this.dbClient?.close());

      this.express.get('/ping', async (req: any, res: any) => {
        res.send({ status: 'pong' });
      });

      app.use(whatsappRoutes);

      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        console.log('Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
