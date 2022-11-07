import express from 'express';
import path from 'path';
import * as http from 'http';
import { whatsappRoutes } from '../../whatsapp';
import { Server as SocetIoServer } from 'socket.io';
import app from '../app';
import { DatabaseClient } from '../domain/database_client';
import { SocketIO } from '../infrastructure/servers/socket_io';
import { WPService } from '../../whatsapp/infrastructure/repositories';

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
      const socketIo = new SocketIO(io as any);

      this.express.get('/ping', async (req: any, res: any) => {
        res.send({ status: 'pong' });
      });

      app.use(whatsappRoutes);

      // http://localhost:4001/static/qr.svg
      app.use('/static', express.static(path.join(__dirname + '/../public')));

      /*
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`  Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        console.log('Press CTRL-C to stop\n');
        resolve();
      });
      */

      socketIo.start();

      server.listen(this.port, () => {
        console.log(`  Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
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
