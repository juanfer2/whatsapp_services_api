import express from 'express';
import * as http from 'http';
import path from 'path';
import { Server as SocetIoServer } from 'socket.io';
import { whatsappRoutes } from '../../../whatsapp';
import app from '../../app';
import { DatabaseClient } from '../../domain/database_client';
import { WhatsappWebClient } from '../clients/whatsapp_web_client';
import { SocketIO } from './socket_io';

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
      this.dbClient?.connect().then();

      const server = http.createServer(this.express);
      const io = new SocetIoServer(server, { cors: { origin: '*' } });
      const whatsappClient = new WhatsappWebClient();
      const socketIo = new SocketIO(io, whatsappClient);

      this.express.get('/ping', async (req: any, res: any) => {
        res.send({ status: 'pong' });
      });

      app.use(whatsappRoutes);
      /// app.use(cohortRoutes);

      // http://localhost:4001/static/qr.svg
      app.use('/static', express.static(path.join(__dirname + '/../../../tmp')));

      /*
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`  Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        console.log('Press CTRL-C to stop\n');
        resolve();
      });
      */

      socketIo.start();

      server.listen(this.port, () => {
        console.log(
          `  🚀 Backend App is running at http://localhost:${this.port} in ${this.express.get(
            'env'
          )} mode`
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
